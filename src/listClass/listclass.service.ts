import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateListClassDto } from './dto/create-listClass.dto';
import { UpdateListClassDto } from './dto/update-listClass.dto';
import { fillterCLass } from './dto/filter';

@Injectable()
export class ListClassService {
  constructor(private prisma: PrismaService) {}

  async create(createMemuDto: CreateListClassDto) {
    const { name } = createMemuDto;
    await this.prisma.listClass.create({
      data: {
        name,
      },
    });
    return { message: 'tao thanh cong' };
  }

  async findAll() {
    const listClass = await this.prisma.listClass.findMany({
      orderBy:{
name:'asc'
      },
      select: {
        id: true,
        name: true,
        class: {
          select: {
            id: true,
            name: true,
            student: true,
          },
        },
      },
    });
    return { listClass };
  }
  async filterListClass(filterList: fillterCLass) {
    const { khoiName, className } = filterList;
    console.log(className);
    const data = await this.prisma.listClass.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        name: khoiName != '' ? khoiName : undefined,
        class: {
          some: {
            name: className != '' ? className : undefined,
          },
        },
      },
      include: {
        class: {
          where: {
            name: className != '' ? className : undefined,
          },
          select: {
            student: {
              select: {
                id: true,
                className: true,
                Date: true,
                sex: true,
                userName: true,
                fullName: true,
                Address: true,
                numberPhone: true,
                email: true,
              },
            },
          },
        },
      },
    });
    return data;
  }
  async findOne(id: string) {
    const Class = await this.prisma.listClass.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        class: {
          select: {
            id: true,
            name: true,
            student: true,
          },
        },
      },
    });
    return { Class };
  }

  async update(id: string, updateMenuDto: UpdateListClassDto) {
    const updateSlug = await this.prisma.listClass.update({
      where: { id },
      data: { ...updateMenuDto },
    });
    return { updateSlug };
  }
  async getListClass(name: string) {
    const classList = await this.prisma.listClass.findMany({
      where: { name },
      select: { class: true },
    });
    return classList;
  }

  async remove(name: string) {
    return await this.prisma.listClass.delete({
      where: { name },
    });
  }
}
