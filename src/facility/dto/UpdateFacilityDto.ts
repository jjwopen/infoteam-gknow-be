import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateFacilityDto {
  @ApiPropertyOptional({
    description: '시설의 이름',
    type: String,
    nullable: true,
    minLength: 1,
    example: '2학생회관',
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: '시설 관리 담당자의 이메일',
    type: String,
    nullable: true,
    example: 'example@gist.ac.kr',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: '시설의 시작 시간',
    type: String,
    nullable: true,
    minLength: 1,
    example: '00:00',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  startTime?: string;

  @ApiPropertyOptional({
    description: '시설의 종료 시간',
    type: String,
    nullable: true,
    minLength: 1,
    example: '00:00',
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  endTime?: string;

  @ApiPropertyOptional({
    description: '시설 관리 번호',
    type: Number,
    nullable: true,
    minimum: 2000,
    maximum: 9999,
    example: 2000,
  })
  @IsNumber()
  @IsOptional()
  @Min(2000)
  @Max(9999)
  number?: number;

  @ApiPropertyOptional({
    description: '시설의 위치',
    type: String,
    nullable: true,
    example: 'E2',
  })
  @IsOptional()
  @IsString()
  location?: string;
}

/*
model Facility {
  id Int @id @default(autoincrement())
  name String @unique
  email String?
  startTime String
  endTime String
  number Int?
  location String
}
*/
