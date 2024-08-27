import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyAuthMiddleware } from './common/middleware/apikey-auth.middleware';
import { LeadGenerationModule } from './lead-generation/lead-generation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LeadGenerationModule,
  ],
  controllers: [],
  providers: [],
})
export class LeadGenerationAppModule implements NestModule {
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
