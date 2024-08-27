import { Module } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { FirestoreService } from '../shared/firestore.service';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { SurveyquestionsController } from './surveyquestions.controller';
import { SurveyquestionsService } from './surveyquestions.service';

@Module({
  controllers: [AssessmentController, SurveyquestionsController],
  providers: [
    SharedService,
    FirestoreService,
    AssessmentService,
    SurveyquestionsService,
  ],
})
export class AssessmentModule {}
