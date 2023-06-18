import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeacherScheduleService } from './TeacherSchedule.service';

@Controller('teacherSchedule')
export class TeacherScheduleController {
  constructor(private readonly teacherSchudele: TeacherScheduleService) {}
  @Post('')
  createShedule(
    @Body()
    subjectInDate: {
      accountName: string;
      subjectName: string;
      time: string;
      nameDate: string;
      className: string;
      yearName: string;
    },
  ) {
    const { accountName, subjectName, time, nameDate, className, yearName } =
      subjectInDate;
    return this.teacherSchudele.create({
      account: {
        connect: {
          userName: accountName,
        },
      },
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
  @Get('')
  getAll(@Query('userName') userName, @Query('yearName') yearName) {
    return this.teacherSchudele.getByTeacher({
      userName,
      yearName,
    });
  }
  @Get('unique')
  getUnique(@Query('userName') userName, @Query('yearName') yearName) {
    return this.teacherSchudele.getClassByShedule({
      userName,
      yearName,
    })
  }

  @Get('class')
  getClass(@Query('Classname') className, @Query('yearName') yearName){
    return this.teacherSchudele.getClass({
      className,
      yearName,
    });
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
      userName: string;
    },
  ) {
    const { subjectName, time, nameDate, className, userName } = subjectInDate;
    return this.teacherSchudele.update({
      where: { id },
      data: {
        ...subjectInDate,
      },
    });
  }
  @Delete('')
  DeleteAll() {
    return this.teacherSchudele.Delete();
  }
}
