import {
  Controller,
  Get,
  //Post,
  //Patch,
  //Put,
  //Delete,
  //Param,
  //Body,
  Query,
  //UseGuards,
  HttpStatus,
  Request,
  HttpCode,
  Version,
} from '@nestjs/common';
import {
  //ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
  //ApiBody,
} from '@nestjs/swagger';
import { MESSAGES } from '../common/messages/en/surveyquestions.messages';
import { SurveyquestionsService } from './surveyquestions.service';
import { ListSurveyquestionDto } from './dto/list-surveyquestion.dto';
import { handleException } from '../common/helper/response.helper';

@ApiSecurity('api-key')
@ApiTags('surveyquestions')
@Controller({ path: 'api/surveyquestions' })
export class SurveyquestionsController {
  constructor(
    private readonly surveyquestionsService: SurveyquestionsService,
  ) {}

  @ApiOperation({ summary: 'List surveyqestions' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @Version('1')
  @Get()
  findAll(@Query() query: ListSurveyquestionDto, @Request() req) {
    try {
      console.log(query);
      console.log(req);
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGES.listSurveyQuestionsSuccess,
        error: '',
        Data: [
          {
            s1: [
              { answer: ['a1', 'a2', 'a3'], q: 'Q1' },
              { answer: ['a1', 'a2', 'a3'], q: 'Q2' },
            ],
          },
          {
            s2: [
              { answer: ['a1', 'a2', 'a3'], q: 'Q3' },
              { answer: ['a1', 'a2', 'a3'], q: 'Q5' },
            ],
          },
        ],
      };
    } catch (error) {
      handleException(error);
    }
  }
}
