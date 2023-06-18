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
} from '@nestjs/common';
import { CreateListClassDto } from './dto/create-listClass.dto';
import { UpdateListClassDto } from './dto/update-listClass.dto';
import { ListClassService } from './listclass.service';
import {fillterCLass} from "./dto/filter";

@Controller('list')
export class ListClassController {
  constructor(private readonly classListService: ListClassService) {}

  @Post()
  create(@Body() createListClassDto: CreateListClassDto) {
    return this.classListService.create(createListClassDto);
  }

  @Get()
  findAll() {
    return this.classListService.findAll();
  }
@Post('filter')
filterClass(@Body() filter:fillterCLass){
    return this.classListService.filterListClass(filter);
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classListService.findOne(id);
  }
  @Get('listclass/:name')
  getAllClass(@Param('name') name: string) {
    return this.classListService.getListClass(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiaDto: UpdateListClassDto) {
    return this.classListService.update(id, updateBiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classListService.remove(id);
  }
}
