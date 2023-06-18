import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateListClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
