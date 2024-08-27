import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyquestionDto } from './create-surveyquestion.dto';

export class UpdateSurveyquestionDto extends PartialType(
  CreateSurveyquestionDto,
) {}
