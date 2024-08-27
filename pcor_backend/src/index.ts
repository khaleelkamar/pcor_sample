import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import {
  VersioningType,
  ValidationPipe,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import Helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as functions from 'firebase-functions';
import { AssessmentAppModule } from './app.assessment.module';
import { LeadGenerationAppModule } from './app.leadgeneration.module';
export let assessmentFunction: functions.HttpsFunction;
export let leadGenerationFunction: functions.HttpsFunction;
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const expressServer = express();
let app: INestApplication<any>;
const createFunction = async (
  expressInstance,
  options_: any,
): Promise<void> => {
  if (options_.cloudFunction === process.env.ASSESSMENT_FUNCTION_LABEL) {
    app = await NestFactory.create(
      AssessmentAppModule,
      new ExpressAdapter(expressInstance),
    );
  } else if (options_.cloudFunction === process.env.LEAD_FUNCTION_LABEL) {
    app = await NestFactory.create(
      LeadGenerationAppModule,
      new ExpressAdapter(expressInstance),
    );
  }

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
    }),
  );

  app.use(Helmet());

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('pcor apis')
    .setDescription('The pcor backend description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
    .addServer(options_.serverUrl || 'localhost:3000')
    .build();

  if (process.env.ENVIRONMENT !== 'prod') {
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.init();
};
function bootstrap() {
  const cloudFunctions = getCloudFunctions();
  for (const cf of cloudFunctions) {
    if (cf.functionName === process.env.ASSESSMENT_FUNCTION_LABEL) {
      assessmentFunction = functions
        .region(cf.region)
        .https.onRequest(async (request, response) => {
          await createFunction(expressServer, {
            serverUrl: `${process.env.BASE_URL}/${cf.region}/${process.env.ASSESSMENT_FUNCTION_LABEL}`,
            cloudFunction: 'assessmentFunction',
          });
          expressServer(request, response);
        });
    }
    if (cf.functionName === process.env.LEAD_FUNCTION_LABEL) {
      leadGenerationFunction = functions
        .region(cf.region)
        .https.onRequest(async (request, response) => {
          await createFunction(expressServer, {
            serverUrl: `${process.env.BASE_URL}/${cf.region}/${process.env.LEAD_FUNCTION_LABEL}`,
            cloudFunction: 'leadGenerationFunction',
          });
          expressServer(request, response);
        });
    }
  }
}

function getCloudFunctions() {
  return [
    {
      functionName: 'assessmentFunction',
      region: 'europe-west1',
      runWith: { memory: '1GB', timeoutSeconds: 540 },
    },
    {
      functionName: 'leadGenerationFunction',
      region: 'europe-west1',
      runWith: { memory: '1GB', timeoutSeconds: 540 },
    },
  ];
}
bootstrap();
