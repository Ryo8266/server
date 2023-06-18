import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const { Ma, Name } = createPermissionDto;
    await this.prisma.permission.create({
      data: {
        Ma,
        Name,
      },
    });
    return { message: 'tao thanh cong' };
  }

  async findAll() {
    const permission = await this.prisma.permission.findMany({
      select: { id: true, Ma: true, Name: true },
    });
    return { permission };
  }

  async findTeacher() {
    const permission = await this.prisma.permission.findMany({
      where: {
        Ma: 'gv',
      },
      select: {
        Account: {
          select: {
            userName: true,
            fullName: true,
            email: true,
            sex: true,
            numberPhone: true,
            Date: true,
            Address: true,
            subjectTeacherName: true,
          },
        },
      },
    });
    return { permission };
  }

  async findStudent() {
    const permission = await this.prisma.permission.findMany({
      where: {
        Ma: 'hs',
      },
      select: {
        Account: {
          select: {
            id: true,
            userName: true,
            fullName: true,
            email: true,
            sex: true,
            numberPhone: true,
            Date: true,
            Address: true,
            className: true,
            Score: true,
          },
        },
      },
    });
    return { permission };
  }

  async findOne(Ma: string) {
    const findpermission = await this.prisma.permission.findUnique({
      where: { Ma },
    });
    return { findpermission };
  }

  async update(id: string, updateBiaDto: UpdatePermissionDto) {
    const updateBia = await this.prisma.permission.update({
      where: { id },
      data: { ...updateBiaDto },
    });
    return { updateBia };
  }

  async remove(id: string) {
    return await this.prisma.permission.delete({
      where: { id },
    });
  }
}
