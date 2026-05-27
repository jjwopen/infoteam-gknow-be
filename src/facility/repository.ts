import { Injectable } from '@nestjs/common';
import { Facility } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFacilityDto } from './dto/CreateFacilityDto';
import { UpdateFacilityDto } from './dto/UpdateFacilityDto';

@Injectable()
export class Repository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Facility[]> {
    return await this.prisma.facility.findMany();
  }

  async findByName(name: string): Promise<Facility | null> {
    const facility = await this.prisma.facility.findUnique({
      where: { name: name },
    });
    return facility;
  }

  async findById(id: number): Promise<Facility | null> {
    const facility = await this.prisma.facility.findUnique({
      where: { id: id },
    });
    return facility;
  }

  async create(data: CreateFacilityDto): Promise<Facility> {
    return await this.prisma.facility.create({ data: data });
  }

  async update(id: number, data: UpdateFacilityDto): Promise<Facility> {
    return await this.prisma.facility.update({ where: { id: id }, data: data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.facility.delete({ where: { id: id } });
  }
}
