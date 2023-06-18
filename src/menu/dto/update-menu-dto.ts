import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  slug: string;
}
