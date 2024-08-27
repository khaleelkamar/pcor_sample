import { Module } from '@nestjs/common';
import { LeadGenerationService } from './lead-generation.service';
import { LeadGenerationController } from './lead-generation.controller';

@Module({
  controllers: [LeadGenerationController],
  providers: [LeadGenerationService],
})
export class LeadGenerationModule {}
