import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaService } from 'prisma/prisma.service';
import {
  AuthDto,
  AuthDtoLogin,
  AuthDtoStudent,
  AuthDtoTeacher,
} from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './../utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(dto: AuthDto) {
    const {
      email,

      fullName,
      numberPhone,
      sex,
      permissionCode,
      userName,
    } = dto;
    const foundEmail = await this.prisma.account.findUnique({
      where: { userName },
    });
    const foundPhoneNumber = await this.prisma.account.findUnique({
      where: { numberPhone },
    });

    if (foundPhoneNumber) {
      return { isError: true, message: 'So Dien Thoai Da Ton Tai' };
    }
    if (foundEmail) {
      return { isError: true, message: 'Email Da Ton Tai' };
    }

    const hashedPassword = await this.hashPassword('123456');
    await this.prisma.account.create({
      data: {
        email,
        hashedPassword,
        fullName,
        numberPhone,
        sex,
        Address: '',
        Date: '',
        Permission: {
          connect: {
            Ma: permissionCode,
          },
        },
        userName,
        avatar: '',
      },
    });
    return { isError: false, message: 'Dang ki Thanh Cong' };
  }

  async signUpStudent(dto: AuthDtoStudent) {
    const {
      email,
   
      fullName,
      numberPhone,
      sex,
      Address,
      Date,
      userName,
      className,
    } = dto;
    console.log(dto);
    const foundEmail = await this.prisma.account.findUnique({
      where: { email },
    });
    const foundPhoneNumber = await this.prisma.account.findUnique({
      where: { numberPhone },
    });
    const studentCode = 'hs';
    if (foundPhoneNumber) {
      return { isError: true, message: 'So Dien Thoai Da Ton Tai' };
    }
    if (foundEmail) {
      return { isError: true, message: 'Email Da Ton Tai' };
    }
    const foundUserName = await this.prisma.account.findUnique({
      where: { userName },
    });
    if (foundUserName) {
      return { isError: true, message: ' Má Học Sinh Đã Tồn Tại' };
    }
    var parts = Date.split("/");
    let day = parts[0]; 
    let month = parts[1];
   let year = parts[2];  
   var outputString = day + month + year;

    const hashedPassword = await this.hashPassword(outputString);
    await this.prisma.account.create({
      data: {
        email,
        hashedPassword,
        fullName,
        numberPhone,
        sex,
        Address,
        Date,
        Permission: {
          connect: {
            Ma: studentCode,
          },
        },
        userName,
        avatar: '',
        Class: {
          connect: {
            name: className,
          },
        },
      },
    });
    return { isError: false, message: 'Dang ki Thanh Cong' };
  }

  async signUpTeacher(dto: AuthDtoTeacher) {
    const {
      email,

      fullName,
      numberPhone,
      sex,
      Address,
      Date,
      userName,
      subjectTeacherName,
    } = dto;
    const foundUserName = await this.prisma.account.findUnique({
      where: { userName },
    });
    const foundEmail = await this.prisma.account.findUnique({
      where: { email },
    });
    const foundPhoneNumber = await this.prisma.account.findUnique({
      where: { numberPhone },
    });
    const studentCode = 'gv';
    if (foundPhoneNumber) {
      return { isError: true, message: 'So Dien Thoai Da Ton Tai' };
    }
    if (foundUserName) {
      return { isError: true, message: ' Má Giáo Viên Đã Tồn Tại' };
    }
    if (foundEmail) {
      return { isError: true, message: ' Email Đã Tồn Tại' };
    }
    var parts = Date.split("/");
    let day = parts[0]; 
    let month = parts[1];
   let year = parts[2];  
   var outputString = day + month + year;

    const hashedPassword = await this.hashPassword(outputString);
  
    await this.prisma.account.create({
      data: {
        email,
        hashedPassword,
        fullName,
        numberPhone,
        sex,
        Address,
        Date,
        Permission: {
          connect: {
            Ma: studentCode,
          },
        },
        userName,
        avatar: '',
        SubjectTeacher: {
          connect: {
            name: subjectTeacherName,
          },
        },
      },
    });
    return { isError: false, message: 'Dang ki Thanh Cong' };
  }
  async signIn(dto: AuthDtoLogin, req: Request, res: Response) {
    const { userName, password } = dto;
    const foundUser = await this.prisma.account.findUnique({
      where: { userName },
    });
    const role = await this.prisma.account.findUnique({
      where: { userName },
      select: {
        permissionCode: true,
      },
    });
    if (!foundUser) {
      return res.status(401).json('Tài Khoản Không Tồn Tại. Xin Vui Lòng Thử Lại');
    }
    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      return res.status(401).json('Mật Khẩu Sai. Vui Lòng Thử Laị'); //401 Unauthenticated
    }
    const token = await this.signToken({
      id: foundUser.userName,
      email: foundUser.email,
      role: foundUser.permissionCode,
    });
    if (!token) {
      console.log('dangw nhap tb');
      throw new ForbiddenException(); //500
    }
    res.cookie('token', token, { httpOnly: true }); // httpOnly (cookie options): chặn script=> không get được cookie thông qua js
    return res.status(200).json({
      Message: 'Logged in success.',
      data: userName,
      accessToken: token,
      role: role.permissionCode,
    });
  }
  async signOut(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ Message: 'Logged out suc' });
  }
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }
  async signToken(asrgs: { id: string; email: string; role: string }) {
    const payload = asrgs;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
