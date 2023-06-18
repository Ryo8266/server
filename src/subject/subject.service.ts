/*
https://docs.nestjs.com/providers#services
*/

import {Injectable} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {CreateSubjectDto} from './dto/subject-create.dto';
import {Prisma, Subject} from "@prisma/client";

@Injectable()
export class SubjectService {
    constructor(private prisma: PrismaService) {
    }

    async createSubject(createSubjectDto: CreateSubjectDto) {
        const {name, Khoi} = createSubjectDto;
        const subject = await this.prisma.subject.create({
            data: {
                name,
                Khoi,
            },
        });
        console.log(subject)
    }

    async getAllSubject() {
        return await this.prisma.subject.findMany({
            select: {
                id: true,
                name: true,
                Khoi: true,
            },
        });
    }

    async getAllSubjectKhoi(Khoi: string) {
        return await this.prisma.subject.findMany({
            where: {Khoi}
        })
    }

    async getSubjectById(id: string) {
        return await this.prisma.subject.findUnique({
            where: {id}
        })
    }
    async getSubjectByName(name: string) {
        return await this.prisma.subject.findUnique({
            where: {name},
            select:{
                id:true,
            }
        })
    }
    async getSubjectPagination(params: {
        page?: number,
    }) {
        const {page} = params;
        return await this.prisma.subject.findMany({
            take: 6,
            skip: (page - 1) * 6,
            orderBy: {
                Khoi: 'asc',
            },
            select: {
                id: true,
                name: true,
                Khoi: true,
            },
        });
    }

    async fillterSubjectbyKhoi(Khoi: string, params: {
        page?: number,
    }) {
        let {page} = params;
        if (isNaN(page)) {
            return await this.prisma.subject.findMany({
                where: {Khoi},
                orderBy: {
                    Khoi: 'asc',
                },
                select: {
                    id: true,
                    name: true,
                    Khoi: true,
                },
            })
        }
        return await this.prisma.subject.findMany({
            where: {Khoi},
            take: 8,
            skip: (page - 1) * 8,
            orderBy: {
                Khoi: 'asc',
            },
            select: {
                id: true,
                name: true,
                Khoi: true,
            },
        });
    }
    async updateSubject(params:{
        data: Prisma.SubjectUpdateInput,
        where:Prisma.SubjectWhereUniqueInput
    }):Promise<Subject>{
        const {data,where} = params
        console.log(data)
        return await this.prisma.subject.update({
            where,data
        })
    }
    async remove(id: string) {
        return await this.prisma.subject.delete({
            where: {id},
        });
    }
}
