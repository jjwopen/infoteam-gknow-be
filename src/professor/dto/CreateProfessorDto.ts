import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class DepartmentEntryDto {
  @ApiProperty({
    description: '부서의 id',
    type: Number,
    nullable: false,
    example: 1,
  })
  @IsNumber()
  departmentId!: number;

  @ApiProperty({
    description: '내선번호',
    type: Number,
    nullable: false,
    minimum: 2000,
    maximum: 9999,
    example: 2000,
  })
  @IsNumber()
  @Min(2000)
  @Max(9999)
  @IsNotEmpty()
  number!: number;
}

export class CreateProfessorDto {
  @ApiProperty({
    description: '교수님 영어이름',
    type: String,
    minLength: 2,
    nullable: false,
    example: 'JiHun',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @ApiProperty({
    description: '교수님 이름',
    type: String,
    minLength: 2,
    nullable: false,
    example: '강지훈',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  nameKorea!: string;

  @ApiProperty({
    description: '교수님의 email',
    type: Array,
    minItems: 1,
    nullable: false,
    example: ['jihoon@gist.ac.kr'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  emails!: string[];

  @ApiProperty({
    description: '교수님의 수업들의 id',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [0, 1, 2],
  })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  courses?: number[];

  @ApiProperty({
    description: '교수님의 부서 id와 내선번호',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [{ departmentId: 1, number: '2000' }],
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DepartmentEntryDto)
  departments!: DepartmentEntryDto[];

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
