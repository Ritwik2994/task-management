import { IsOptional, IsString } from 'class-validator';

export class GetExamTypeFilterDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
