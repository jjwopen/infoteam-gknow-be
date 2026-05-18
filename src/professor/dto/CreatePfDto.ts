import { ApiProperty } from '@nestjs/swagger';

export class CreatePfDto {
  @ApiProperty({
    description: '교수님 이름',
    type: String,
    minLength: 2,
    nullable: false,
    example: '강지훈',
  })
  name!: string;

  @ApiProperty({
    description: '교수님 내선 번호',
    type: Number,
    minimum: 2000,
    maximum: 9999,
    nullable: false,
    example: 2000,
  })
  number!: number;

  @ApiProperty({
    description: '교수님의 email',
    type: String,
    minLength: 1,
    nullable: false,
    example: 'jihoon@gist.ac.kr',
  })
  email!: string;

  @ApiProperty({
    description: '교수님의 수업들',
    type: Array,
    minItems: 1,
    nullable: false,
    example: [0, 1, 2],
  })
  courses!: number[];
}
