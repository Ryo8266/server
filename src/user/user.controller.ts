import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { Put, Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Account as AccountModel } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

import { UpdatePassword } from './dto/update-password.dto';
import excelToJson from 'convert-excel-to-json';
import * as bcrypt from 'bcrypt';
import { fillterUser } from './dto/filter-user.dto';
import { query } from 'express';

var XLSX = require('xlsx');

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('import')
  createMany(
    @Body()
    data: {
      userName: string;
      permissionCode: string;
      hashedPassword: string;
      email: string;
      sex: string;
      Date: string;
      Address: string;
      numberPhone: string;
      fullName: string;
      avatar: string;
      className: string;
    },
  ) {
    return this.usersService.createMany({ data });
  }
  @Post('importTeacher')
  createManyTeacher(
    @Body()
    data: {
      userName: string;
      permissionCode: string;
      hashedPassword: string;
      email: string;
      sex: string;
      Date: string;
      Address: string;
      numberPhone: string;
      fullName: string;
      avatar: string;
      subjectTeacherName: string;
    },
  ) {
    return this.usersService.createManyTeacher({ data });
  }
  @Post('test')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    let filePath = file.path;
    var workbook = XLSX.readFile(filePath);
    var sheet_name_list = workbook.SheetNames;
    let result;
    sheet_name_list.forEach(function (y) {
      var worksheet = workbook.Sheets[y];
      var headers = {};
      var data = [];
      for (let z in worksheet) {
        if (z[0] === '!') continue;
        var col = z.substring(0, 1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;
        if (row == 1) {
          headers[col] = value;
          continue;
        }
        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
      }
      data.shift();
      data.shift();
      result = data;
    });
    return { result };
  }

  @Patch('avatar/:userName')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  updatedAvatar(
    @Param('userName') userName: string,
    @Body()
    UserData: {
      avatar: string;
    },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AccountModel> {
    const { avatar } = UserData;
    return this.usersService.updateAvatar({
      where: { userName },
      data: {
        avatar: file.filename,
      },
    });
  }

  @Put('upadate/profile/:userName')
  updateProfile(
    @Param('userName') userName: string,
    @Body()
    profileData: {
      fullName: string;
      hashedPassword: string;
      email: string;
      sex: string;
      className: string;
      Date: string;
      Address: string;
      numberPhone: string;
      subjectTeacherName: string;
    },
  ): Promise<AccountModel> {
    let {
      fullName,
      hashedPassword,
      email,
      sex,
      className,
      Date,
      Address,
      numberPhone,
      subjectTeacherName,
    } = profileData;

    return this.usersService.UpdateUser({
      where: { userName },
      data: { ...profileData },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('username/:userName')
  getMyUserbyEmail(@Param() params: { userName: string }, @Req() req) {
    return this.usersService.getMyUserbyEmail(params.userName, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.usersService.getUsers();
  }

  @Get('img/:imagename')
  getImg(@Param('imagename') imagename, @Res() res): Observable<Object> {
    console.log(imagename);
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }

  @Get('search/filter')
  Search(
    @Query('page') page,
    @Query('query') query,
    @Query('className') className,
    @Query('sex') sex,
  ) {
    console.log(page, className, sex);
    return this.usersService.getStudentfilter({
      page: Number(page),
      query,
      className,
      sex,
    });
  }

  @Get('search/filter/teacher')
  SearchTeacher(
    @Query('page') page,
    @Query('query') query,
    @Query('subjectTeacherName') subjectTeacherName,
    @Query('sex') sex,
  ) {
    return this.usersService.getTeacherfilter({
      page: Number(page),
      query,
      subjectTeacherName,
      sex,
    });
  }
  @Get('role/student')
  getStudent(@Query('page') page) {
    return this.usersService.getAllStudents({ page: Number(page) });
  }

  @Put('changePassword/:userName')
  ChangePassword(
    @Param('userName') userName: string,
    @Body() updatePassword: UpdatePassword,
    @Res() res,
  ) {
    return this.usersService.changePassword(updatePassword, res, userName);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  @Delete('delete/:userName')
  Delete(@Param('userName') userName: string) {
    return this.usersService.DeleteAccount(userName);
  }
  @Delete('delete/teacher/all')
  DeleteTeacher() {
    return this.usersService.DeleteAccountTeacher();
  }
  @Delete('delete/student/all')
  DeleteStudet() {
    return this.usersService.DeleteAccountStudent();
  }
}
