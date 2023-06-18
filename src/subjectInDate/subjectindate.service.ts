/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Prisma, Subject, subjectInDate } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SubjectInDate } from './entity/Shedule.entity';

@Injectable()
export class SubjectinDateService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.subjectInDateCreateInput): Promise<subjectInDate> {
    return await this.prisma.subjectInDate.create({
      data,
    });
  }

  async getScheduleByClassAndYear(className: string, yearName: string) {
    if (yearName == 'undefined') {
      const year = await this.prisma.year.findMany(
          {
            where: { isActive: true },
            orderBy: { name: 'desc' },
            take: 1,
          }
      );
      yearName = year[0].name;
      console.log(year);
    }
    const results = await this.prisma.subjectInDate.findMany({
      orderBy: {
        time: 'asc',
      },
      where: {
        // OR: [{ className }, { yearName }],
        className : className ,
        yearName : yearName,
      },
    });
 console.log(yearName)
    const result = results.reduce((acc, curr) => {
      const key = curr.nameDate;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});

    const formattedData = Object.keys(result).map((key) => ({
      [key]: result[key],
    }));

    return results;
  }

  async createMany(dto) {
    let data = await dto.data.map((el, index) => ({
      subjectName: el.subjectName,
      time: el.time,
      nameDate: el.nameDate,
      className: el.className,
    }));
    console.log(data);
    return await this.prisma.subjectInDate.createMany({
      data,
    });
  }

  async update(params: { data; where: Prisma.subjectInDateWhereUniqueInput }) {
    const { data, where } = params;
    console.log(where);
    // const checkShedule = await this.prisma.subjectInDate.findUnique({
    //   where,
    // });
    console.log(data);
    if (where.id === 'undefined') {
      console.log(true);
      const createShedule = await this.prisma.subjectInDate.createMany({
        data,
      });
      return createShedule;
    }

    const sheduleUpdate = await this.prisma.subjectInDate.update({
      where,
      data,
    });
    return;
  }
}
