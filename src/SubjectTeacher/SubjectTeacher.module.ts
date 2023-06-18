/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SubjectTeacherController } from './subjectteacher.controller';
import { SubjectTeacherService } from './subjectteacher.service';

@Module({
  imports: [],
  controllers: [SubjectTeacherController],
  providers: [SubjectTeacherService],
})
export class SubjectTeacherModule {}
