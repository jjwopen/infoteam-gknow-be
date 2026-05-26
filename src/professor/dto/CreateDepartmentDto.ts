import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class ProfessorEntryDto {
  @ApiProperty({ example: 1 })
  professorId!: number;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  number!: number;
}
export class CreateDepartmentDto {
  @ApiProperty({
    description: '학과의 영어이름',
    type: String,
    minLength: 1,
    nullable: false,
    example: 'department',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name!: string;

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
  nameKorea!: string;

  @ApiProperty({
    description: '학과 내 교수님 id',
    type: Array,
    minItems: 0,
    nullable: true,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessorEntryDto)
  professors?: ProfessorEntryDto[];

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

  @ApiProperty({
    description: '학과 사이트',
    type: String,
    minLength: 1,
    nullable: true,
    example: 'experment@gist.ac.kr',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  address?: string;
}
