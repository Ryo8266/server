/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { JwtStrategy } from 'src/auth/jwt.strangegy';

@Module({
  imports: [],
  controllers: [ClassController],
  providers: [ClassService, JwtStrategy],
})
export class ClassModule {}
