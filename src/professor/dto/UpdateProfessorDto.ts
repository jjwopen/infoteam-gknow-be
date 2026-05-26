import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProfessorDto {
  @ApiPropertyOptional({
    description: '교수님 이름',
    type: String,
    minLength: 2,
    nullable: true,
    example: '강지훈',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    description: '교수님 내선 번호',
    type: Number,
    minimum: 2000,
    maximum: 9999,
    nullable: true,
    example: 2000,
  })
  @IsOptional()
  @IsNumber()
  @Min(2000)
  @Max(9999)
  number?: number;

  @ApiPropertyOptional({
    description: '교수님의 email',
    type: String,
    minLength: 1,
    nullable: true,
    example: ['jihoon@gist.ac.kr'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  emails?: string[];

  @ApiPropertyOptional({
    description: '교수님의 수업들',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [0, 1, 2],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  courses?: number[];

  @ApiPropertyOptional({
    description: '교수님의 부서, 학과의 id',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [0, 1, 2],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  departments?: number[];

  @ApiPropertyOptional({
    description: '교수님의 이미지',
    type: String,
    nullable: true,
    example: 'http://example.jpg',
  })
  @IsOptional()
  @IsString()
  imageURL?: string;
}
