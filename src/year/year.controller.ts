/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { YearService } from './year.service';
import { Year } from '@prisma/client';

@Controller('year')
export class YearController {
  constructor(private readonly yearService: YearService) {}
  @Post('')
  create(
    @Body()
    classData: {
      name: string;
    },
  ) {
    const { name } = classData;
    return this.yearService.create({
      name,
    });
  }
  @Get('')
  getAll() {
    return this.yearService.getAll();
  }
  @Get('isActive')
  getIsActive() {
    return this.yearService.getIsActive();
  }
  @Patch('isActive/:id')
  updateActive(
    @Param('id') id: string,
    @Body()
    ClassNameData: {
      isActive: boolean;
    },
  ): Promise<Year> {
    const { isActive } = ClassNameData;
    return this.yearService.update({
      where: { id },
      data: {
        isActive: !isActive,
      },
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    ClassNameData: {
      name: string;
    },
  ): Promise<Year> {
    const { name } = ClassNameData;
    return this.yearService.changeActive({
      where: { id },
      data: {
        name,
      },
    });
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearService.remove(id);
  }
}
