import { ApiProperty } from '@nestjs/swagger';

export class CreatePfDto {
  name!: string;
  number!: number;
  email!: string;
}
