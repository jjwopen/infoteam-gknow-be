import { Injectable } from '@nestjs/common';
import { Professor, Course, Department, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Repository {
  constructor(private prisma: PrismaService) {}

  async findAllProfessor(): Promise<Professor[]> {
    return await this.prisma.professor.findMany();
  }

  async findAllCourse(): Promise<Course[]> {
    return await this.prisma.course.findMany();
  }

  async findAllDepartment(): Promise<Department[]> {
    return await this.prisma.department.findMany();
  }

  async findProfessorByName(name: string): Promise<Professor[]> {
    const professor = await this.prisma.professor.findMany({
      where: { name: name },
    });
    return professor;
  }

  async findProfessorById(id: number): Promise<Professor | null> {
    const professor = await this.prisma.professor.findUnique({
      where: { id: id },
    });
    return professor;
  }

  async findProfessorByCourse(course: string): Promise<Professor[]> {
    const professor = await this.prisma.professor.findMany({
      where: { course: { some: { name: course } } },
    });
    return professor;
  }

  async findCourseByName(name: string): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: { name: name },
    });
    return course;
  }

  async findDepartmentByName(name: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: { name: name },
    });
    return department;
  }

  async findProfessorByDepartment(name: string): Promise<Professor[]> {
    const Professor = await this.prisma.professor.findMany({
      where: { departments: { some: { department: { name: name } } } },
    });
    return Professor;
  }

  async findCourseById(id: number): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({ where: { id: id } });
    return course;
  }

  async findDepartmentById(id: number): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: { id: id },
    });
    return department;
  }

  async createProfessor(data: Prisma.ProfessorCreateInput) {
    return await this.prisma.professor.create({ data: data });
  }

  async createCourse(data: Prisma.CourseCreateInput) {
    return await this.prisma.course.create({ data: data });
  }

  async createDepartment(data: Prisma.DepartmentCreateInput) {
    return await this.prisma.department.create({ data: data });
  }

  async updateProfessor(id: number, data: Prisma.ProfessorUpdateInput) {
    return await this.prisma.professor.update({
      where: { id: id },
      data: data,
    });
  }

  async updateCourse(id: number, data: Prisma.CourseUpdateInput) {
    return await this.prisma.course.update({ where: { id: id }, data: data });
  }

  async updateDepartment(id: number, data: Prisma.DepartmentUpdateInput) {
    return await this.prisma.department.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteProfessor(id: number) {
    await this.prisma.professor.delete({ where: { id: id } });
  }

  async deleteCourse(id: number) {
    await this.prisma.course.delete({ where: { id: id } });
  }

  async deleteDepartment(id: number) {
    await this.prisma.department.delete({ where: { id: id } });
  }
}
