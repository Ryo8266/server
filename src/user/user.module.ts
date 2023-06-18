import { JwtStrategy } from 'src/auth/jwt.strangegy';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({ dest: './uploads' })],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UserModule {}
