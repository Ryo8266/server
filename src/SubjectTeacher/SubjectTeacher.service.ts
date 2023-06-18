import {Injectable} from '@nestjs/common';
import {PrismaService} from 'prisma/prisma.service';
import {Prisma, SubjectTeacher} from "@prisma/client";

@Injectable()
export class SubjectTeacherService {
    constructor(private prisma: PrismaService) {
    }

    async createSubjectteacher(data: Prisma.SubjectTeacherCreateInput): Promise<SubjectTeacher> {
        return await this.prisma.subjectTeacher.create({
            data
        });
    }

    async getAllSubjectteachers( params: {
        page?: number,
    }) {
        let {page} = params;
        if (isNaN(page)){
            return await this.prisma.subjectTeacher.findMany({

                    select: {
                        id: true,
                        name: true,
                        teachers: true,
                        _count:true,
                    },


            });
        }

        return await this.prisma.subjectTeacher.findMany({
            take: 6,
            skip: (page - 1) * 6,
            select: {
                id: true,
                name: true,
                teachers: true,
                _count:true,
            }
        });
    }

    async getTeacher(name: string) {
        const data = await this.prisma.subjectTeacher.findMany({

            where: {
                name
            },
            select: {
                teachers: {
                    orderBy: {
                        userName: 'asc'

                    },
                    select: {

                        userName: true,
                        fullName: true,
                        email: true,
                        numberPhone: true,
                        sex: true,
                        Date: true,
                        Address: true,
                        subjectTeacherName: true,

                    }
                }
            }
        });

        if (data.length === 0) {
            return {message: 'Không tìm thấy kết quả'}
        }
        return data;
    }

    async updateSubjectteacher(id: string, subjectTeacherUpdateInput: Prisma.SubjectTeacherUpdateInput) {
        const data = await this.prisma.subjectTeacher.update({
            where: {id},
            data: {...subjectTeacherUpdateInput},
        });
        return {message: 'update Thành Công', data: data};
    }
    async delete(id: string) {
        const data = await this.prisma.subjectTeacher.delete({
            where: {id},

        });
        return {message: 'Xóa Thành Công',};
    }
}
