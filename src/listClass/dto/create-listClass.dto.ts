import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
