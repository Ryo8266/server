import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';

import { PrismaService } from 'prisma/prisma.service';
import { UpdatePassword } from './dto/update-password.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    // const decodedUserInfo = req.account as { id: string; userName: string };
    const foundUser = await this.prisma.account.findUnique({ where: { id } });

    console.log('id');
    if (!foundUser) {
      throw new NotFoundException();
    }
    delete foundUser.hashedPassword;
    return { user: foundUser };
  }

  async getMyUserbyEmail(userName: string, req: Request) {
    const foundUser = await this.prisma.account.findUnique({
      where: { userName },
    });
    console.log('id');
    if (!foundUser) {
      throw new NotFoundException();
    }
    delete foundUser.hashedPassword;
    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prisma.account.findMany({
      select: {
        id: true,
        email: true,
        avatar: true,
        fullName: true,
        permissionCode: true,
        userName: true,
        sex: true,
        Address: true,
        Date: true,
        numberPhone: true,
      },
    });
    return { users };
  }

  async getAllStudents(params: { page?: number }) {
    let { page } = params;
    let users;
    if (isNaN(page)) {
      users = await this.prisma.account.findMany({
        where: {
          permissionCode: 'hs',
        },
        select: {
          id: true,
          userName: true,
          fullName: true,
          sex: true,
          Address: true,
          numberPhone: true,
          Date: true,
          className: true,
          email: true,
        },
      });
    } else {
      users = await this.prisma.account.findMany({
        where: {
          permissionCode: 'hs',
        },
        take: 12,
        skip: (page - 1) * 12,
        select: {
          id: true,
          userName: true,
          fullName: true,
          sex: true,
          Address: true,
          numberPhone: true,
          Date: true,
          className: true,
          email: true,
        },
      });
    }

    return users;
  }

  async updateAvatar(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { data, where } = params;
    return this.prisma.account.update({
      data,
      where,
    });
  }

  async createManyTeacher(dto) {
    let hashPassword1 = [];
    hashPassword1 = await Promise.all(
      dto.data.data.map(async (item) => {
    
        return await this.hashPassword(String(item.Date).split("/").join(""));
      }),
    );

    let data = await dto.data.data.map((el, index) => ({
      userName: el.userName,
      fullName: el.fullName,
      sex: el.sex,
      Date: el.Date,
      Address: el.Address,
      numberPhone: el.numberPhone,
      permissionCode: 'gv',
      hashedPassword: hashPassword1[index],
      subjectTeacherName: el.subjectTeacherName,
      email: el.email,
      className: '',
    }));
    
 
   const listUser = await this.prisma.account.createMany({
    data,
  });
    return  listUser
  }

  async getStudentfilter(params: {
    page?: number;
    query?: string;
    className?: string;
    sex?: string;
  }) {
    const { page, query, className, sex } = params;
    console.log(page);
    if (isNaN(page)) {
      return await this.prisma.account.findMany({
        orderBy: {
          userName: 'asc',
        },
        where: {
          permissionCode: 'hs',
          sex: sex != '' ? sex : undefined,
          className: className != '' ? className : '',
          OR: [
            { userName: { contains: query || '' } },
            { fullName: { contains: query || '' } },
          ],
        },
        select:{
          id:true,
          userName:true,
          fullName:true,
          sex:true,
          Address:true,
          numberPhone:true,
          Date:true,
          className:true,
          email:true,
          Score:true,
        }
      });
    }
    return await this.prisma.account.findMany({
      take: 15,
      skip: (page - 1) * 15,
      orderBy: {
        userName: 'asc',
      },
      where: {
        permissionCode: 'hs',
        sex: sex != '' ? sex : undefined,
        className: className != '' ? className : '',
        OR: [
          { userName: { contains: query || '' } },
          { fullName: { contains: query || '' } },
        ],
      },
    });
  }
  async getTeacherfilter(params: {
    page?: number;
    query?: string;
    subjectTeacherName?: string;
    sex?: string;
  }) {
    const { page, query, subjectTeacherName, sex } = params;
    console.log(page);
    if (isNaN(page)) {
      return await this.prisma.account.findMany({
        orderBy: {
          userName: 'asc',
        },
        where: {
          permissionCode: 'gv',
          sex: sex != '' ? sex : undefined,
          subjectTeacherName:
            subjectTeacherName != '' ? subjectTeacherName : undefined,
          OR: [
            { userName: { contains: query || '' } },
            { fullName: { contains: query || '' } },
          ],
        },
      });
    }
    return await this.prisma.account.findMany({
      take: 15,
      skip: (page - 1) * 15,
      orderBy: {
        userName: 'asc',
      },
      where: {
        permissionCode: 'gv',
        sex: sex != '' ? sex : undefined,
        subjectTeacherName:
          subjectTeacherName != '' ? subjectTeacherName : undefined,
        OR: [
          { userName: { contains: query || '' } },
          { fullName: { contains: query || '' } },
        ],
      },
    });
  }
  async createMany(dto) {
    let hashPassword1 = [];
    hashPassword1 = await Promise.all(
      dto.data.data.map(async (item) => {
        console.log(String(item.Date).split("/").join(""))
        return await this.hashPassword(String(item.Date).split("/").join(""));
      }),
    );
console.log(hashPassword1)
    let data = await dto.data.data.map((el, index) => ({
      userName: ''+ el.userName,
      fullName: el.fullName,
      className: el.className,
      sex: el.sex,
      Date: el.Date,
      Address: el.Address,
      numberPhone: el.numberPhone,
      permissionCode: 'hs',
      hashedPassword: hashPassword1[index],
      email: el.email,
    }));
    dto.data.data.map((el, index) => {
      console.log(index)
      console.log(hashPassword1[index])
    });

    return await this.prisma.account.createMany({
      data,
    });
  }

  async changePassword(dto: UpdatePassword, res: Response, userName: string) {
    const { oldPassword, newPassword } = dto;
    if (oldPassword !== newPassword) {
      return res.status(451).json('Mật khẩu không giống nhau');
    }
    const hashedPassword = await this.hashPassword(newPassword);
    await this.prisma.account.update({
      where: { userName },
      data: { hashedPassword },
    });
    return res.status(150).json({
      Message: 'đổi mật khẩu thành công',
    });
  }

  async UpdateUser(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { data, where } = params;
    const user = data.userName;
    console.log(where);
    const oldPassword = await this.prisma.account.findUnique({
      where: {
        userName: where.userName,
      },
      select: {
        hashedPassword: true,
      },
    });

    let hashedPassword;
    if (data.hashedPassword !== undefined) {
      const Newpassword = data.hashedPassword;
      hashedPassword = await bcrypt.hash(Newpassword, 10);
      return this.prisma.account.update({
        where,
        data,
      });
    }
    data.hashedPassword = oldPassword.hashedPassword;

    return this.prisma.account.update({
      where,
      data,
    });
  }

  async DeleteAccount(userName: string) {
    const oldPassword = await this.prisma.account.findUnique({
      where: {
        userName: userName
      },
    
    });
    console.log(oldPassword)
    return await this.prisma.account.delete({
      where: { userName:userName },
    });
  }
  async DeleteAccountTeacher(){
    return await this.prisma.account.deleteMany({
      where: { permissionCode:'gv' },
    });
  }
  async DeleteAccountStudent(){
    return await this.prisma.account.deleteMany({
      where: { permissionCode:'hs' },
    });
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
   compareArrays(array1, array2) {
    var differentElements = array1.filter(element1 => {
      return !array2.some(element2 => element2.subjectTeacherName === element1.name);
    });
  
    return differentElements;
  }
   filterDuplicates(array) {
    var uniqueArray = array.filter((element, index, self) => {
      return index === self.findIndex(e => (
    e.subjectTeacherName === element.subjectTeacherName
      ));
    });
  
    return uniqueArray;
  }
   transformArray(array) {
    var transformedArray = array.map(element => {
      return { name: element.subjectTeacherName };
    });
  
    return transformedArray;
  }
}
