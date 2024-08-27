import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyAuthMiddleware } from './common/middleware/apikey-auth.middleware';
import { AssessmentModule } from './assessment/assessment.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    AssessmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AssessmentAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyAuthMiddleware)
      .exclude(
        { path: '/api/test', method: RequestMethod.GET },
        { path: 'api/doc', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
