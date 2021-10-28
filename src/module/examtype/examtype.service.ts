import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ExamTypeDto } from './dto/exam-type.dto';
import { GetExamTypeFilterDto } from './dto/get-exam-type-filter.dto';
import { ExamType } from './examtype.entity';
import { ExamTypeRepository } from './examtype.repository';

@Injectable()
export class ExamtypeService {
  constructor(
    @InjectRepository(ExamTypeRepository)
    private examTypeRepository: ExamTypeRepository,
  ) {}

  getExamTypes(
    filterDto: GetExamTypeFilterDto,
    user: User,
  ): Promise<ExamType[]> {
    return this.examTypeRepository.getExamTypes(filterDto, user);
  }

  async getExamTypeById(id: string, user: User): Promise<ExamType> {
    const found = await this.examTypeRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createExamType(examTypeDto: ExamTypeDto): Promise<ExamType> {
    return this.examTypeRepository.createExamType(examTypeDto);
  }

  async deleteExamType(id: string): Promise<void> {
    const result = await this.examTypeRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Exam Type with ID "${id}" not found`);
    }
  }

  async updateExamType(
    id: string,
    name: string,
    description: string,
    user: User,
  ): Promise<ExamType> {
    const examType = await this.getExamTypeById(id, user);

    examType.name = name;
    examType.description = description;
    await this.examTypeRepository.save(examType);

    return examType;
  }
}
