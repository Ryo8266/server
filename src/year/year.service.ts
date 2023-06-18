/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Year } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class YearService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.YearCreateInput): Promise<Year> {
    return await this.prisma.year.create({
      data,
    });
  }
  async getAll() {
    return await this.prisma.year.findMany({
      orderBy: {
        name: 'desc',
      },
    });
  }
  async getIsActive() {
    return await this.prisma.year.findMany({
      orderBy: {
        name: 'desc',
      },
      where: {
        isActive: true,
      },
    });
  }
  async changeActive(params: {
    where: Prisma.YearWhereUniqueInput;
    data: Prisma.YearUpdateInput;
  }): Promise<Year> {
    const { data, where } = params;

    return this.prisma.year.update({
      data,
      where,
    });
  }
  async update(params: {
    where: Prisma.YearWhereUniqueInput;
    data: Prisma.YearUpdateInput;
  }): Promise<Year> {
    console.log(params.data);
    const { data, where } = params;
    const isActive = await this.prisma.year.findUnique({
      where,
    });
    console.log(isActive);
    return this.prisma.year.update({
      data: {
        isActive: !isActive.isActive,
      },
      where,
    });
  }
  async remove(id: string) {
    return await this.prisma.year.delete({
      where: { id },
    });
  }
}
