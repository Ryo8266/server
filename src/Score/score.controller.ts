/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Subject } from 'rxjs';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}
  @Post('')
  create(
    @Body()
    score: {
      Score15m: number;
      Score45m: number;
      Score60m: number;
      semester: string;
      accountId: string;
      subjectName: string;
      yearName:string;
      average: number

    },
  ) {
    const { Score15m, Score45m, Score60m, semester, accountId, subjectName,yearName,average } =score;
    return this.scoreService.createScore({
      Score15m,
      Score45m,
      Score60m,
      average,
      semester,
      Account: {
        connect: {
          userName: accountId,
        },
      },
      Subject: {
        connect: {
          name: subjectName,
        },
      },
      Year: {
        connect: {
          name: yearName,
        },
      },
    });
  }
  @Get('')
    findAll(@Query('accountId') accountId,@Query ('hocky') hocky,@Query ('subjectId') subjectId,@Query('yearName') yearName) {
    return this.scoreService.getScore({accountId, yearName,hocky,subjectId})
  }
    @Get('all')
    findAllSubject(@Query('accountId') accountId,@Query ('hocky') hocky,@Query('yearName') yearName) {
        return this.scoreService.getAlScoreSubject({accountId, yearName,hocky})
    }
  @Post('createMany')
  createMany(
    @Body()
    score: {
      Score15m: number;
      Score45m: number;
      Score60m: number;
      semester: string;
      accountId: string;
      subjectName: string;
      yearName:string;
      average: number
    },
  ) {
    const { Score15m, Score45m, Score60m, semester, accountId, subjectName,yearName,average } =score;
    return this.scoreService.createMany({
      score

    });
  }
  @Patch(':id')
  UpdateScore(@Param('id') id,@Body()
  ScoreUpdate:{
    Score15m?:  number,
    Score45m?:  number,
    Score60m?:  number,
    average?:  number,
    semester?: string
  } 
  ){
const {Score15m,
  Score45m,
  Score60m,
  average,
  semester} = ScoreUpdate
  
  return this.scoreService.Update(
{
  where: { id },
  data: {
    ...ScoreUpdate,
  },
}
  )

  }
}