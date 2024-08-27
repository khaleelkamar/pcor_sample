import { Injectable } from '@nestjs/common';
import { CreateSurveyquestionDto } from './dto/create-surveyquestion.dto';
import { UpdateSurveyquestionDto } from './dto/update-surveyquestion.dto';

@Injectable()
export class SurveyquestionsService {
  create(createSurveyquestionDto: CreateSurveyquestionDto) {
    console.log(createSurveyquestionDto);
    return 'This action adds a new surveyquestion';
  }

  findAll() {
    return `This action returns all surveyquestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} surveyquestion`;
  }

  update(id: number, updateSurveyquestionDto: UpdateSurveyquestionDto) {
    console.log(updateSurveyquestionDto);
    return `This action updates a #${id} surveyquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} surveyquestion`;
  }
}
