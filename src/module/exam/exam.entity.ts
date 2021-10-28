import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExamType } from '../examtype/examType.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  code: string;

  @Column()
  sub_category_id: string;

  @OneToOne(() => ExamType)
  @JoinColumn()
  exam_type_id: ExamType;

  @Column({
    default: 0,
  })
  total_questions: number;

  @Column({
    default: 0,
  })
  total_duration: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  total_marks: number;

  @Column()
  is_paid: boolean;

  @Column()
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  negative_marking: number;

  @Column({
    default: false,
  })
  is_private: boolean;

  @Column({
    default: true,
  })
  is_active: boolean;

  @Column({ type: 'timestamptz' })
  timestamps: Date;
}
