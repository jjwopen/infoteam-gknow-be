import { Injectable, NotFoundException } from '@nestjs/common';
import { Professor, Course, Department } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/CreateCourseDto';
import { CreateDepartmentDto } from './dto/CreateDepartmentDto';
import { CreateProfessorDto } from './dto/CreateProfessorDto';
import { UpdateCourseDto } from './dto/UpdateCourseDto';
import { UpdateDepartmentDto } from './dto/UpdateDepartmentDto';
import { UpdateProfessorDto } from './dto/UpdateProfessorDto';
@Injectable()
export class Repository {
  constructor(private prisma: PrismaService) {}

  async findProfessorByName(name: string): Promise<Professor[]> {
    const professor = await this.prisma.professor.findMany({
      where: { name: name },
    });
    if (!professor) {
      throw new NotFoundException(`이름이 ${name}인 교수 없음`);
    }
    return professor;
  }

  async findProfessorById(id: number): Promise<Professor> {
    const professor = await this.prisma.professor.findUnique({
      where: { id: id },
    });
    if (!professor) {
      throw new NotFoundException(`id가 ${id}인 교수가 없음`);
    }
    return professor;
  }

  async findByCourse(course: string): Promise<Professor[]> {
    const inputCourse = await this.findCourseByName(course);
    if (!inputCourse) {
      throw new NotFoundException(`${course}는 존재하지 않는 과목입니다.`);
    }
    const professor = await this.prisma.professor.findMany({
      where: { courses: { some: { name: course } } },
    });
    if (!professor.length) {
      throw new NotFoundException(`${course}을 담당하는 교수님은 없습니다.`);
    }
    return professor;
  }

  async findCourseByName(name: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { name: name },
    });
    if (!course) {
      throw new NotFoundException(`${name}는 존재하지 않는 과목입니다.`);
    }
    return course;
  }

  async DepartmentByName(name: string): Promise<Department> {
    const department = await this.prisma.department.findUnique({
      where: { name: name },
    });
    if (!department) {
      throw new NotFoundException(`${name}인 부서는 없습니다.`);
    }
    return department;
  }

  async findProfessorByDepartment(name: string): Promise<Professor[]> {
    const inputDepartment = await this.DepartmentByName(name);
    if (!inputDepartment) {
      throw new NotFoundException(`${name}인 부서는 없습니다.`);
    }
    const Professor = await this.prisma.professor.findMany({
      where: { departments: { some: { name: name } } },
    });
    if (Professor.length) {
      throw new NotFoundException(`${name}에 속해있는 교수님은 없습니다.`);
    }
    return Professor;
  }

  async createProfessor(create: CreateProfessorDto): Promise<Professor> {
    return await this.prisma.professor.create({ data: create });
  }

  async createCourse(create: CreateCourseDto) {}

  async createDepartment(create: CreateDepartmentDto) {}

  async updateProfessor(update: UpdateProfessorDto) {}

  async updateCourse(update: UpdateCourseDto) {}

  async updateDepartment(update: UpdateDepartmentDto) {}
}
