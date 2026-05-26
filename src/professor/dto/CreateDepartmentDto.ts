import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
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
    minItems: 0,
    nullable: true,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  professors?: number[];

  @ApiProperty({
    description: '학과 대표 id',
    type: String,
    minLength: 1,
    nullable: false,
    example: 'experment@gist.ac.kr',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  emails!: string;
}
