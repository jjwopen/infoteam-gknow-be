import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateCsDto {
  @ApiPropertyOptional({
    description: '교과목의 이름',
    type: String,
    nullable: true,
    minLength: 1,
    example: '미적분학과 응용',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({
    description: '교과목으 코드',
    type: String,
    nullable: true,
    minLength: 6,
    example: 'GS1111',
  })
  @IsString()
  @IsOptional()
  @MinLength(6)
  code?: string;

  @ApiPropertyOptional({
    description: '교과목의 담당 교수의 id',
    type: Array,
    nullable: true,
    minItems: 1,
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  professors?: number[];
}
