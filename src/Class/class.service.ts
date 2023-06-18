import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Class, Prisma } from '@prisma/client';
import { fillterCLass } from './dto/interface';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClassCreateManyInput) {
    const isChecked = await this.prisma.class.findUnique({
      where: {
        name: data.name,
      },
    });
    console.log(data);
    if (isChecked) {
      return { isError: true, message: 'Lớp học đã tồn tại' };
    }
    const res = await this.prisma.class.create({
      data,
    });
    return { isError: false, message: 'Tạo lớp học thành công', data: res };
  }

  async getClassbyList(name: string) {
    return await this.prisma.class.findMany({
      orderBy:{
name:'asc'
      },
      where: {
        Khoi: name,
      },
      
    });
  }
  async findAll(params: { page?: number }) {
    let { page } = params;
    let classList;
    if (isNaN(page)) {
      classList = await this.prisma.class.findMany({
        orderBy: {
          name: 'asc',
        },
        select: {
          id: true,
          name: true,
          Khoi: true,
          student: true,
          _count: true,
          schedule: true,
        },
      });
    } else {
      classList = await this.prisma.class.findMany({
        orderBy: {
          name: 'asc',
        },
        take: 6,
        skip: (page - 1) * 6,
        select: {
          id: true,
          name: true,
          Khoi: true,
          student: true,
          _count: true,
          schedule: true,
        },
      });
    }
    return classList;
  }
  async findOne(id: string) {
    const classlist = await this.prisma.class.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        student: {
          orderBy: {
            userName: 'desc',
          },
        },
      },
    });
    return { classlist };
  }

  async getStudentbyClass(name: string) {
    const students = await this.prisma.class.findMany({
      orderBy: {
        name: 'asc',
      },
      where: { name },
      select: {
        student: {
          select: {
            userName: true,
            fullName: true,
            className: true,
            sex: true,
            Date: true,
            Address: true,
            numberPhone: true,
            email: true,
          },
        },
      },
    });
    return students;
  }

  async getClassPagianation(params: { page?: number }) {
    const { page } = params;
    console.log(params);
    const classlist = await this.prisma.class.findMany({
      take: 8,
      skip: (page - 1) * 8,
      orderBy: {
        name: 'asc',
      },
      select: {
        name: true,
        Khoi: true,
        student: true,
        schedule: true,
      },
    });
    return classlist;
  }

  async update(params: {
    where: Prisma.ClassWhereUniqueInput;
    data: Prisma.ClassUpdateInput;
  }): Promise<Class> {
    const { data, where } = params;
    return this.prisma.class.update({
      data,
      where,
    });
  }

  async filterClass(
    fillter: fillterCLass,
    params: {
      page?: number;
    },
  ) {
    const { khoiName } = fillter;
    console.log(khoiName);
    const { page } = params;
    console.log(page);
    if (isNaN(page)) {
      return await this.prisma.class.findMany({
        orderBy: {
          name: 'asc',
        },
        where: { Khoi: khoiName != '' ? khoiName : undefined },
        select: {
          id: true,
          name: true,
          Khoi: true,
          student: {
            select: {
              userName: true,
              fullName: true,
              className: true,
              sex: true,
              Date: true,
            },
          },
          _count: true,
        },
      });
    } else {
      return await this.prisma.class.findMany({
        take: 8,
        skip: (page - 1) * 8,
        orderBy: {
          name: 'asc',
        },
        where: { Khoi: khoiName != '' ? khoiName : undefined },
        select: {
          id: true,
          name: true,
          Khoi: true,
          student: {
            select: {
              userName: true,
              fullName: true,
              className: true,
              sex: true,
              Date: true,
            },
          },
          _count: true,
        },
      });
    }
  }

  async remove(id: string) {
    return await this.prisma.class.delete({
      where: { id },
    });
  }
}
