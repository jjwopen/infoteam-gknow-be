import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from './repository';
import { Course, Department, Professor, Prisma } from '@prisma/client';
import { CreateProfessorDto } from './dto/CreateProfessorDto';
import { CreateCourseDto } from './dto/CreateCourseDto';
import { CreateDepartmentDto } from './dto/CreateDepartmentDto';
import { UpdateProfessorDto } from './dto/UpdateProfessorDto';
import { UpdateCourseDto } from './dto/UpdateCourseDto';
import { UpdateDepartmentDto } from './dto/UpdateDepartmentDto';
@Injectable()
export class ProfessorService {
  constructor(private readonly repo: Repository) {}

  async findProfessorByName(name: string): Promise<Professor[]> {
    const professor = await this.repo.findProfessorByName(name);
    if (!professor.length) {
      throw new NotFoundException(`이름이 ${name}인 교수가 없습니다.`);
    }
    return professor;
  }

  async findProfessorById(id: number): Promise<Professor> {
    const professor = await this.repo.findProfessorById(id);
    if (!professor) {
      throw new NotFoundException(`id가 ${id}인 교수님이 없습니다.`);
    }
    return professor;
  }

  async findProfessorByCourse(name: string): Promise<Professor[]> {
    const professor = await this.repo.findProfessorByCourse(name);
    if (!professor.length) {
      throw new NotFoundException(`${name}를 담당하는 교수님이 없습니다.`);
    }
    return professor;
  }

  async findCourseByName(name: string): Promise<Course> {
    const course = await this.repo.findCourseByName(name);
    if (!course) {
      throw new NotFoundException(`${name}의 교과목은 없습니다.`);
    }
    return course;
  }

  async findDepartmentByName(name: string): Promise<Department> {
    const department = await this.repo.findDepartmentByName(name);
    if (!department) {
      throw new NotFoundException(`${name}인 부서가 없습니다.`);
    }
    return department;
  }

  async findProfessorByDepartment(name: string): Promise<Professor[]> {
    await this.findDepartmentByName(name);
    const professor = await this.repo.findProfessorByDepartment(name);
    if (!professor.length) {
      throw new NotFoundException(`${name}에 속해있는 교수가 앖습니다.`);
    }
    return professor;
  }

  async createProfessor(create: CreateProfessorDto): Promise<Professor> {
    const {
      emails,
      courses,
      departments,
      ...dataWithoutDepartmentAndCourseAndEmail
    } = create;
    const prismaData: Prisma.ProfessorCreateInput = {
      ...dataWithoutDepartmentAndCourseAndEmail,
      emails: emails.length
        ? { create: emails.map((emailAddress) => ({ address: emailAddress })) }
        : undefined,
      course: courses
        ? { connect: courses.map((courseId) => ({ id: courseId })) }
        : undefined,
      departments: departments
        ? {
            connect: departments.map((departmentsId) => ({
              id: departmentsId,
            })),
          }
        : undefined,
    };
    return await this.repo.createProfessor(prismaData);
  }

  async createCourse(create: CreateCourseDto): Promise<Course> {
    const { professors, ...dataWithoutProfessor } = create;
    const Data: Prisma.CourseCreateInput = {
      ...dataWithoutProfessor,
      professors: {
        connect: professors?.map((professorId) => ({ id: professorId })),
      },
    };
    return await this.repo.createCourse(Data);
  }

  async createDepartment(create: CreateDepartmentDto): Promise<Department> {
    const { emails, professors, ...dataWithoutProfessor } = create;
    const Data: Prisma.DepartmentCreateInput = {
      ...dataWithoutProfessor,
      emails: { create: { address: emails } },
      professors: {
        connect: professors?.map((professorId) => ({ id: professorId })),
      },
    };
    return await this.repo.createDepartment(Data);
  }

  async updateProfessor(
    id: number,
    update: UpdateProfessorDto,
  ): Promise<Professor> {
    const { emails, courses, departments, ...dataWithoutCourseAndDepartment } =
      update;
    const Data: Prisma.ProfessorUpdateInput = {
      ...dataWithoutCourseAndDepartment,
      emails: emails
        ? {
            deleteMany: {},
            create: emails.map((emailAddress) => ({ address: emailAddress })),
          }
        : undefined,
      course: courses
        ? { connect: courses.map((courseID) => ({ id: courseID })) }
        : undefined,
      departments: departments
        ? {
            connect: departments.map((departmentsId) => ({
              id: departmentsId,
            })),
          }
        : undefined,
    };
    return await this.repo.updateProfessor(id, Data);
  }

  async updateCourse(id: number, update: UpdateCourseDto): Promise<Course> {
    const { professors, ...dataWithoutProfessor } = update;
    const Data: Prisma.CourseUpdateInput = {
      ...dataWithoutProfessor,
      professors: professors
        ? {
            connect: professors.map((professorsId) => ({ id: professorsId })),
          }
        : undefined,
    };
    return await this.repo.updateCourse(id, Data);
  }

  async updateDepartment(
    id: number,
    update: UpdateDepartmentDto,
  ): Promise<Department> {
    const { emails, professors, ...dataWithoutProfessors } = update;
    const Data: Prisma.DepartmentUpdateInput = {
      ...dataWithoutProfessors,
      emails: emails ? { create: { address: emails } } : undefined,
      professors: professors
        ? { connect: professors.map((professorsId) => ({ id: professorsId })) }
        : undefined,
    };
    return await this.repo.updateDepartment(id, Data);
  }

  async findCourseById(id: number): Promise<Course> {
    const course = await this.repo.findCourseById(id);
    if (!course) {
      throw new NotFoundException(`id가 ${id}인 과목은 없습니다.`);
    }
    return course;
  }

  async findDepartmentById(id: number): Promise<Department> {
    const department = await this.repo.findDepartmentById(id);
    if (!department) {
      throw new NotFoundException(`id가 ${id}인 부서는 없습니다.`);
    }
    return department;
  }

  async deleteProfessor(id: number): Promise<void> {
    await this.findProfessorById(id);
    await this.repo.deleteProfessor(id);
  }

  async deleteCourse(id: number): Promise<void> {
    await this.findCourseById(id);
    await this.repo.deleteCourse(id);
  }

  async deleteDepartment(id: number): Promise<void> {
    await this.findDepartmentById(id);
    await this.repo.deleteDepartment(id);
  }
}
