import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    description: '학과의 이름',
    type: String,
    minLength: 1,
    nullable: false,
    example: '인문사회과학부',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({
    description: '학과 내 교수님 id',
    type: Array,
    minItems: 1,
    nullable: false,
    example: [1, 2, 3],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  professors!: number[];
}
