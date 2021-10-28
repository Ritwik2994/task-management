import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { config } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { ExamtypeModule } from './module/examtype/examtype.module';
import { ExamModule } from './module/exam/exam.module';
import { QuestionModule } from './module/question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UserModule,
    ExamtypeModule,
    ExamModule,
    QuestionModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
