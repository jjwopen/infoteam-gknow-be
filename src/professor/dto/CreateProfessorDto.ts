import { ApiProperty } from '@nestjs/swagger';
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
} from 'class-validator';

export class CreateProfessorDto {
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
  name!: string;

  @ApiProperty({
    description: '교수님 내선 번호',
    type: Number,
    minimum: 2000,
    maximum: 9999,
    nullable: false,
    example: 2000,
  })
  @IsNumber()
  @Min(2000)
  @Max(9999)
  @IsNotEmpty()
  number!: number;

  @ApiProperty({
    description: '교수님의 email',
    type: String,
    minLength: 1,
    nullable: false,
    example: 'jihoon@gist.ac.kr',
  })
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: '교수님의 수업들의 id',
    type: Array,
    minItems: 1,
    nullable: false,
    example: [0, 1, 2],
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  courses!: number[];

  @ApiProperty({
    description: '교수님의 부서, 학과의 id',
    type: Array,
    minItems: 1,
    nullable: true,
    example: [0, 1, 2],
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  departments!: number[];

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

/*model Professor {
  id Int @id @default(autoincrement())
  name String
  email String @unique
  number Int @unique
  courses Course[]
  departments Department[]
  imageURL String
}
 */
