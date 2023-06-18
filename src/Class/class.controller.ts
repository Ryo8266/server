/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassService } from './class.service';
import { Class, Class as ClasskModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { fillterCLass } from './dto/interface';
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Post('')
  create(
    @Body()
    classData: {
      name: string;
      Khoi: string;
    },
  ) {
    const { name, Khoi } = classData;
    return this.classService.create({
      name,
      Khoi,
    });
  }
  @Get()
  findAll(@Query('page') page) {
    return this.classService.findAll({ page: Number(page) });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }
  @Get('Khoi/:name')
  findClassByList(@Param('name') name: string) {
    return this.classService.getClassbyList(name);
  }
  @Post('filter')
  filter(@Body() datafilter: fillterCLass, @Query('page') page) {
    return this.classService.filterClass(datafilter, { page: Number(page) });
  }
  @Get('students/:name')
  getStudent(@Param('name') name: string) {
    return this.classService.getStudentbyClass(name);
  }
  @Get('page/:page')
  getClasssPagination(@Param('page') page: number) {
    console.log(page);
    return this.classService.getClassPagianation({ page: Number(page) });
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    ClassNameData: {
      name: string;
    },
  ): Promise<ClasskModel> {
    const { name } = ClassNameData;
    return this.classService.update({
      where: { id },
      data: {
        ...ClassNameData,
      },
    });
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<ClasskModel> {
    return this.classService.remove(id);
  }
}
