/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { YearService } from './year.service';

@Module({
  imports: [],
  controllers: [YearController],
  providers: [YearService],
})
export class YearModule {}
