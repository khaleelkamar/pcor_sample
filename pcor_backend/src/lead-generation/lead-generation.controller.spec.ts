import { Test, TestingModule } from '@nestjs/testing';
import { LeadGenerationController } from './lead-generation.controller';
import { LeadGenerationService } from './lead-generation.service';

describe('LeadGenerationController', () => {
  let controller: LeadGenerationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadGenerationController],
      providers: [LeadGenerationService],
    }).compile();

    controller = module.get<LeadGenerationController>(LeadGenerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
