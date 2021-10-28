import { User } from 'src/module/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ExamTypeDto } from './dto/exam-type.dto';
import { GetExamTypeFilterDto } from './dto/get-exam-type-filter.dto';
import { ExamType } from './examtype.entity';

@EntityRepository(ExamType)
export class ExamTypeRepository extends Repository<ExamType> {
  async getExamTypes(
    filterDto: GetExamTypeFilterDto,
    user: User,
  ): Promise<ExamType[]> {
    const { name, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (name) {
      query.andWhere('examtype.name = :name', { name });
    }

    if (search) {
      query.andWhere(
        '(LOWER(examtype.name) LIKE LOWER(:search) OR LOWER(examtype.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const examTypes = await query.getMany();
    return examTypes;
  }

  async createExamType(examTypeDto: ExamTypeDto): Promise<ExamType> {
    const { name, description } = examTypeDto;

    const examType = this.create({
      name,
      description,
    });

    await this.save(examType);
    return examType;
  }
}
