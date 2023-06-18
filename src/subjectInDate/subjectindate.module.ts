/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SubjectController } from 'src/subject/subject.controller';
import { SubjectService } from 'src/subject/subject.service';
import { SubjectInDateController } from './subjectindate.controller';
import { SubjectinDateService } from './subjectindate.service';

@Module({
  imports: [],
  controllers: [SubjectInDateController],
  providers: [SubjectinDateService],
})
export class SubjectInDateModule {}
