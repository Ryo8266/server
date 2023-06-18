/*
https://docs.nestjs.com/controllers#controllers
*/

import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Subject } from '@prisma/client';
import { CreateSubjectDto } from './dto/subject-create.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Post('')
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createSubject(createSubjectDto);
  }
  @Get('')
  getAll() {
    return this.subjectService.getAllSubject();
  }
  @Get('name/:name')
  getByName(@Param('name') name) {
    return this.subjectService.getSubjectByName(name);
  }
  @Get('id/:id')
  getById(@Param() params: { id: string }) {
    return this.subjectService.getSubjectById(params.id);
  }
  @Get('pagination')
  Paginations(@Query('page') page){
    return this.subjectService.getSubjectPagination({page:Number(page)})
  }
  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body()
          subjectData: {
        name: string;
        Khoi:string;
      },
  ): Promise<Subject> {
    const { name,Khoi } = subjectData;
    return this.subjectService.updateSubject({
      where: { id },
      data: {
        ...subjectData,
      },
    });
  }
  @Get('Khoi/:Khoi')
  fillterByKhoi(@Query('page') page , @Param('Khoi')Khoi:string){
    return this.subjectService.fillterSubjectbyKhoi(Khoi,{page:Number(page)})
  }
  @Delete(':id')
  DeleteSubject( @Param('id') id: string,){
    return this.subjectService.remove(id)
  }
}
