/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SubjectinDateService } from './subjectindate.service';
import { subjectInDate } from '@prisma/client';

@Controller('subjectInDate')
export class SubjectInDateController {
  constructor(private readonly subjectInDateSevice: SubjectinDateService) {}

  @Post('')
  create(
    @Body()
    subjectInDate: {
      subjectName: string;
      time: string;
      nameDate: string;
      className: string;
      yearName: string;
    },
  ): Promise<subjectInDate> {
    const { subjectName, time, nameDate, className, yearName } = subjectInDate;
    return this.subjectInDateSevice.create({
      Subject: {
        connect: {
          name: subjectName,
        },
      },
      time,
      nameDate,
      class: {
        connect: {
          name: className,
        },
      },
      Year: {
        connect: {
          name: yearName,
        },
      },
    });
  }

  @Get('class/:name/year/:year')
  findSheduleByClassName(
    @Param('name') className: string,
    @Param('year') yearName: string,
  ) {
    return this.subjectInDateSevice.getScheduleByClassAndYear(
      className,
      yearName,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    subjectInDate: {
      subjectName: string;
      time: string;
      nameDate: string;
      className: string;
    },
  ) {
    const { subjectName, time, nameDate, className } = subjectInDate;
    return this.subjectInDateSevice.update({
      where: { id },
      data: {
        ...subjectInDate,
      },
    });
  }

  @Post('many')
  createMany(
    @Body()
    data: {
      subjectName: string;
      time: string;
      nameDate: string;
      className: string;
    },
  ) {
    // const { subjectName, time, nameDate,className } = subjectInDate;
    return this.subjectInDateSevice.createMany({
      data,
    });
  }
}
