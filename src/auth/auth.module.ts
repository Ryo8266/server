import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express/multer';
@Module({
  imports: [
    JwtModule,
    PassportModule,
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
