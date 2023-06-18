/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';

@Module({
  imports: [],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
