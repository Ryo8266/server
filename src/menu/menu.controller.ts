import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu-dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly biaService: MenuService) {}

  @Post()
  create(@Body() createBiaDto: CreateMenuDto) {
    return this.biaService.create(createBiaDto);
  }

  @Get()
  findAll() {
    return this.biaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiaDto: UpdateMenuDto) {
    return this.biaService.update(id, updateBiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biaService.remove(id);
  }
}
