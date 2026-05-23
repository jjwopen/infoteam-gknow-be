// professors.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/CreateProfessorDto';
import { CreateCourseDto } from './dto/CreateCourseDto';
import { CreateDepartmentDto } from './dto/CreateDepartmentDto';
import { UpdateProfessorDto } from './dto/UpdateProfessorDto';
import { UpdateCourseDto } from './dto/UpdateCourseDto';
import { UpdateDepartmentDto } from './dto/UpdateDepartmentDto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('professors')
@Controller('professors')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  @ApiCreatedResponse({ description: '교수님이 추가되었습니다.' })
  @ApiOperation({ summary: '교수님 추가' })
  async createProfessor(@Body() createDto: CreateProfessorDto) {
    return await this.professorService.createProfessor(createDto);
  }

  @Post('courses')
  @ApiCreatedResponse({ description: '과목이 추가되었습니다.' })
  @ApiOperation({ summary: '과목 추가' })
  async createCourse(@Body() createDto: CreateCourseDto) {
    return await this.professorService.createCourse(createDto);
  }

  @Post('departments')
  @ApiCreatedResponse({ description: '부서가 추가되었습니다.' })
  @ApiOperation({ summary: '부서 추가' })
  async createDepartment(@Body() createDto: CreateDepartmentDto) {
    return await this.professorService.createDepartment(createDto);
  }

  @Get('search/name')
  @ApiOkResponse({ description: '교수님 찾기 성공' })
  @ApiOperation({ summary: '이름 기반 교수님 찾기' })
  @ApiNotFoundResponse({ description: '해당 이름을 가진 교수님은 없습니다.' })
  async findProfessorByName(@Query('name') name: string) {
    return await this.professorService.findProfessorByName(name);
  }

  @Get('search/course')
  @ApiOkResponse({ description: '교수님 찾기 성공' })
  @ApiOperation({ summary: '과목 기반 교수님 찾기' })
  @ApiNotFoundResponse({
    description:
      '입력하신 이름의 과목이 없거나 해당 과목을 담당하는 교수님은 없습니다.',
  })
  async findProfessorByCourse(@Query('name') name: string) {
    return await this.professorService.findProfessorByCourse(name);
  }

  @Get('search/department')
  @ApiOkResponse({ description: '교수님 찾기 성공' })
  @ApiOperation({ summary: '부서 기반 교수님 찾기' })
  @ApiNotFoundResponse({
    description:
      '입력하신 이름의 부서가 없거나 해당 부서에 계신 가진 교수님은 없습니다.',
  })
  async findProfessorByDepartment(@Query('name') name: string) {
    return await this.professorService.findProfessorByDepartment(name);
  }

  @Get('courses/search')
  @ApiOkResponse({ description: '과목 찾기 성공' })
  @ApiOperation({ summary: '이름기반 과목 찾기' })
  @ApiNotFoundResponse({ description: '해당 이름을 가진 과목은 없습니다.' })
  async findCourseByName(@Query('name') name: string) {
    return await this.professorService.findCourseByName(name);
  }

  @Get('departments/search')
  @ApiOkResponse({ description: '부서 찾기 성공' })
  @ApiOperation({ summary: '이름기반 부서 찾기' })
  @ApiNotFoundResponse({ description: '해당 이름을 가진 부서는 없습니다.' })
  async findDepartmentByName(@Query('name') name: string) {
    return await this.professorService.findDepartmentByName(name);
  }

  @Get(':id')
  @ApiOkResponse({ description: '교수님 찾기 성공' })
  @ApiOperation({ summary: 'id 기반 교수님 찾기' })
  @ApiNotFoundResponse({ description: '해당 id를 가진 교수님은 없습니다.' })
  async findProfessorById(@Param('id', ParseIntPipe) id: number) {
    return await this.professorService.findProfessorById(id);
  }

  @Get('courses/:id')
  @ApiOkResponse({ description: '과목 찾기 성공' })
  @ApiOperation({ summary: 'id기반 과목 찾기' })
  @ApiNotFoundResponse({ description: '해당 id를 가진 부서는 없습니다.' })
  async findCourseById(@Param('id', ParseIntPipe) id: number) {
    return await this.professorService.findCourseById(id);
  }

  @Get('departments/:id')
  @ApiOkResponse({ description: '부서 찾기 성공' })
  @ApiOperation({ summary: 'id기반 부서 찾기' })
  @ApiNotFoundResponse({ description: '해당 id를 가진 부서는 없습니다.' })
  async findDepartmentById(@Param('id', ParseIntPipe) id: number) {
    return await this.professorService.findDepartmentById(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: '교수 정보 수정 성공' })
  @ApiOperation({ description: '교수 정보 수정' })
  @ApiNotFoundResponse({ description: '해당 Id를 사용하는 교수가 없습니다.' })
  async updateProfessor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProfessorDto,
  ) {
    return await this.professorService.updateProfessor(id, updateDto);
  }

  @Patch('courses/:id')
  @ApiOkResponse({ description: '과목 정보 수정 성공' })
  @ApiOperation({ description: '과목 정보 수정' })
  @ApiNotFoundResponse({ description: '해당 Id를 사용하는 과목이 없습니다.' })
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourseDto,
  ) {
    return await this.professorService.updateCourse(id, updateDto);
  }

  @Patch('departments/:id')
  @ApiOkResponse({ description: '부서 정보 수정 성공' })
  @ApiOperation({ description: '부서 정보 수정' })
  @ApiNotFoundResponse({ description: '해당 Id를 사용하는 부서가 없습니다.' })
  async updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDepartmentDto,
  ) {
    return await this.professorService.updateDepartment(id, updateDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: '교수 삭제 성공' })
  @ApiOperation({ description: '교수 삭제' })
  @ApiNotFoundResponse({ description: '해당 Id를 사용하는 교수가 없습니다.' })
  async deleteProfessor(@Param('id', ParseIntPipe) id: number) {
    await this.professorService.deleteProfessor(id);
  }

  @Delete('courses/:id')
  @ApiOkResponse({ description: '과목 삭제 성공' })
  @ApiOperation({ description: '과목 삭제' })
  @ApiNotFoundResponse({ description: '해당 Id를 사용하는 과목이 없습니다.' })
  async deleteCourse(@Param('id', ParseIntPipe) id: number) {
    await this.professorService.deleteCourse(id);
  }

  @Delete('departments/:id')
  @ApiOkResponse({ description: '부서 정보 삭제 성공' })
  @ApiOperation({ description: '부서 정보 삭제' })
  @ApiNotFoundResponse({ description: '해당 Id를 사용하는 부서가 없습니다.' })
  async deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    await this.professorService.deleteDepartment(id);
  }
}
