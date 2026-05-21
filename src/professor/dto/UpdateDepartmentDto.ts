import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({
    description: '학과의 이름',
    type: String,
    minLength: 1,
    nullable: true,
    example: '인문사회과학부',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({
    description: '학과 내 교수님 id',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  professors!: number[];

  @ApiProperty({
    description: '교수님의 이미지',
    type: String,
    nullable: true,
    example: 'http://example.jpg',
  })
  @IsOptional()
  @IsString()
  imageURL?: string;
}
