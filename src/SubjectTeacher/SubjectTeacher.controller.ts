/*
https://docs.nestjs.com/controllers#controllers
*/

import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {SubjectTeacherService} from "./subjectteacher.service";
import {SubjectTeacher} from "@prisma/client";
import {CreateSubjectTeacherDto} from "./dto/create-subjectTeacher.dto";

@Controller('subject-teacher')
export class SubjectTeacherController {
    constructor(private readonly subjectTeacherService: SubjectTeacherService) {
    }

    @Post('')
    createSubjectTeacher(@Body() subjectTeacherData: {
        name: string
    }): Promise<SubjectTeacher> {
        const name = subjectTeacherData;
        return this.subjectTeacherService.createSubjectteacher(name);
    }

    @Get('')
    getAllSubjectTeacher(@Query('page') page) {
        return this.subjectTeacherService.getAllSubjectteachers({page:Number(page)});
    }

    @Post('filter')

    getSubjectTeacher(@Body() subjectTeacherData: {
        name: string
    }) {
        const {name} = subjectTeacherData;
        return this.subjectTeacherService.getTeacher(name)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() createSubjectTeacherDto: CreateSubjectTeacherDto,
    ) {
        return this.subjectTeacherService.updateSubjectteacher(id, createSubjectTeacherDto);
    }

    @Delete(':id')
    delete (
        @Param('id') id: string,

    ) {
        return this.subjectTeacherService.delete(id);
    }
}

