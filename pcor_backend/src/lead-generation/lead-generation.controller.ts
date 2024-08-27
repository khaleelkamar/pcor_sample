import {
  Controller,
  Get,
  Post,
  //Put,
  //Delete,
  //Param,
  Body,
  //Query,
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
import { MESSAGES } from '../common/messages/en/leadgeneration.messages';
import { LeadGenerationService } from './lead-generation.service';
import { CreateLeadGenerationDto } from './dto/create-lead-generation.dto';
//import { UpdateLeadGenerationDto } from './dto/update-lead-generation.dto';
import { handleException } from '../common/helper/response.helper';

@ApiSecurity('api-key')
@ApiTags('lead-generation')
@Controller({ path: 'api/lead-generation' })
export class LeadGenerationController {
  constructor(private readonly leadGenerationService: LeadGenerationService) {}

  @Post()
  @ApiOperation({ summary: 'Create project' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @Version('1')
  async create(@Body() dto: CreateLeadGenerationDto, @Request() req) {
    try {
      console.log(req);
      const response = await this.leadGenerationService.create(dto);
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGES.addLeadSuccess,
        error: '',
        Data: response,
      };
    } catch (error) {
      handleException(error);
    }
  }

  @Get()
  @Version('1')
  findAll() {
    return this.leadGenerationService.findAll();
  }
}
