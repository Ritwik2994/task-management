import { IsString } from 'class-validator';

export class ExamTypeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
