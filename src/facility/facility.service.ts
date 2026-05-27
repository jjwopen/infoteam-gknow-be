import { Injectable, NotFoundException } from '@nestjs/common';
import { FacilityRepository } from './facility.repository';
import { Facility } from '@prisma/client';
import { CreateFacilityDto } from './dto/CreateFacilityDto';
import { UpdateFacilityDto } from './dto/UpdateFacilityDto';

@Injectable()
export class FacilityService {
  constructor(private readonly repo: FacilityRepository) {}

  async findAll(): Promise<Facility[]> {
    return await this.repo.findAll();
  }

  async findByName(name: string): Promise<Facility> {
    const facility = await this.repo.findByName(name);
    if (!facility) {
      throw new NotFoundException(`${name}(이)라는 시설은 없습니다.`);
    }
    return facility;
  }

  async findById(id: number): Promise<Facility> {
    const facility = await this.repo.findById(id);
    if (!facility) {
      throw new NotFoundException(`ID가 ${id}인 시설은 없습니다.`);
    }
    return facility;
  }

  async create(data: CreateFacilityDto): Promise<Facility> {
    return await this.repo.create(data);
  }

  async update(id: number, data: UpdateFacilityDto): Promise<Facility> {
    await this.findById(id);
    return await this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    return await this.repo.delete(id);
  }
}
