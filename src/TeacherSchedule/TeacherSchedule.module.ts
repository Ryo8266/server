
import { Module } from '@nestjs/common';
import { TeacherScheduleController } from 'src/TeacherSchedule/TeacherSchedule.controller';
import { TeacherScheduleService } from 'src/TeacherSchedule/TeacherSchedule.service';


@Module({
    imports: [],
    controllers: [TeacherScheduleController],
    providers: [TeacherScheduleService],
})
export class TeacherScheduleModule{}
