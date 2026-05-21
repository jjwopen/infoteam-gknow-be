import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCsDto {
  @ApiProperty({
    description: '교과목의 이름',
    type: String,
    nullable: false,
    minLength: 1,
    example: '미적분학과 응용',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({
    description: '교과목으 코드',
    type: String,
    nullable: false,
    minLength: 6,
    example: 'GS1111',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  code!: string;

  @ApiProperty({
    description: '교과목의 담당 교수의 id',
    type: String,
    nullable: false,
    minItems: 1,
    example: [1, 2, 3],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  professors!: number[];
}
