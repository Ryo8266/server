import { PermissionController } from './permission.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
