import { YearModule } from './year/year.module';
import { SubjectInDateModule } from './subjectInDate/subjectindate.module';
import { ScoreModule } from './Score/score.module';
import { SubjectModule } from './subject/subject.module';
import { SubjectTeacherModule } from './SubjectTeacher/subjectteacher.module';
import { ListClassModule } from './listClass/listclass.module';
import { ClassModule } from './Class/class.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { PermissionModule } from './permission/permission.module';
import {TeacherScheduleModule } from "./TeacherSchedule/TeacherSchedule.module";
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    YearModule,
    SubjectInDateModule,
    ScoreModule,
    SubjectModule,
    SubjectTeacherModule,
    ListClassModule,
    ClassModule,
    UserModule,
    MenuModule,
    PermissionModule,
    PrismaModule,
    AuthModule,
    TeacherScheduleModule,
    ConfigModule.forRoot(),
  ],
  // // control
})
export class AppModule {}
