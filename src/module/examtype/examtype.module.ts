import { Module } from '@nestjs/common';
import { ExamtypeController } from './examtype.controller';
import { ExamtypeService } from './examtype.service';

@Module({
  controllers: [ExamtypeController],
  providers: [ExamtypeService]
})
export class ExamtypeModule {}
