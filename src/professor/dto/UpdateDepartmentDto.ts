import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProfessorEntryDto } from './CreateDepartmentDto';

export class UpdateDepartmentDto {
  @ApiPropertyOptional({
    description: '학과의 이름',
    type: String,
    minLength: 1,
    nullable: true,
    example: '인문사회과학부',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({
    description: '학과의 이름',
    type: String,
    minLength: 1,
    nullable: true,
    example: '인문사회과학부',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nameKorea?: string;

  @ApiPropertyOptional({
    description: '학과 내 교수님 id',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessorEntryDto)
  professors?: ProfessorEntryDto[];

  @ApiPropertyOptional({
    description: '학과 대표 id',
    type: String,
    minLength: 1,
    nullable: false,
    example: 'experment@gist.ac.kr',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  emails?: string;

  @ApiPropertyOptional({
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
