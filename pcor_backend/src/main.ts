import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  VersioningType,
  ValidationPipe,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import * as bodyParser from 'body-parser';
import Helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('bootsrapng');
  const app = await NestFactory.create(AppModule);
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
  const options = new DocumentBuilder()
    .setTitle('pcor apis')
    .setDescription('The pcor backend description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')

    .build();

  if (process.env.ENVIRONMENT !== 'prod') {
    const document = SwaggerModule.createDocument(app, options);
    console.log('document', document);
    SwaggerModule.setup('api', app, document);
  }
  app.use(Helmet());
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());
  await app.listen(3000);
  app.use(csurf());
}
bootstrap();
