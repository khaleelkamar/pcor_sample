import { Test, TestingModule } from '@nestjs/testing';
import { LeadGenerationService } from './lead-generation.service';

describe('LeadGenerationService', () => {
  let service: LeadGenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadGenerationService],
    }).compile();

    service = module.get<LeadGenerationService>(LeadGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
