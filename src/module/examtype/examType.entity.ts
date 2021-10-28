import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExamType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
