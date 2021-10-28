import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExamTypeDto } from './dto/exam-type.dto';
import { GetUser } from '../user/get-user.decorator';
import { GetExamTypeFilterDto } from './dto/get-exam-type-filter.dto';
import { ExamType } from './examtype.entity';
import { ExamtypeService } from './examtype.service';
import { User } from '../user/user.entity';

@Controller('examtype')
export class ExamtypeController {
  constructor(private examtypeService: ExamtypeService) {}

  @Get()
  getExamTypes(
    @Query() filterDto: GetExamTypeFilterDto,
    @GetUser() user: User,
  ): Promise<ExamType[]> {
    return this.examtypeService.getExamTypes(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ExamType> {
    return this.examtypeService.getExamTypeById(id, user);
  }

  @Post()
  createTask(@Body() examTypeDto: ExamTypeDto): Promise<ExamType> {
    return this.examtypeService.createExamType(examTypeDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.examtypeService.deleteExamType(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() examTypeDto: ExamTypeDto,
    @GetUser() user: User,
  ): Promise<ExamType> {
    const { name, description } = examTypeDto;
    return this.examtypeService.updateExamType(id, name, description, user);
  }
}
