/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ListClassController } from './listclass.controller';
import { ListClassService } from './listclass.service';

@Module({
  imports: [],
  controllers: [ListClassController],
  providers: [ListClassService],
})
export class ListClassModule {}
