import { Injectable } from '@nestjs/common';
import { CreateLeadGenerationDto } from './dto/create-lead-generation.dto';
import { UpdateLeadGenerationDto } from './dto/update-lead-generation.dto';

@Injectable()
export class LeadGenerationService {
  async create(
    createLeadGenerationDto: CreateLeadGenerationDto,
  ): Promise<string> {
    console.log('createLeadGenerationDto', createLeadGenerationDto);
    return 'success';
  }

  findAll() {
    return `This action returns all leadGeneration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadGeneration`;
  }

  update(id: number, updateLeadGenerationDto: UpdateLeadGenerationDto) {
    console.log(updateLeadGenerationDto);
    return `This action updates a #${id} leadGeneration`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadGeneration`;
  }
}
