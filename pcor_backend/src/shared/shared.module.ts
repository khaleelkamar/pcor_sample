import { Module } from '@nestjs/common';
import { SharedController } from './shared.controller';
import { SharedService } from './shared.service';
import { FirestoreService } from './firestore.service';
import { CacheService } from './cache.service';

@Module({
  controllers: [SharedController],
  providers: [SharedService, FirestoreService, CacheService],
})
export class SharedModule {}
