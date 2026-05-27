import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe, // 추가됨
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/CreateFacilityDto';
import { UpdateFacilityDto } from './dto/UpdateFacilityDto';

@ApiTags('facility')
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  @ApiOkResponse({ description: '전체 시설 목록 조회 성공' })
  @ApiOperation({ summary: '전체 시설 조회' })
  async findAll() {
    return await this.facilityService.findAll();
  }

  @Get('search')
  @ApiOkResponse({ description: '시설 이름 검색 성공' })
  @ApiOperation({ summary: '이름 기반 시설 검색' })
  @ApiNotFoundResponse({ description: '해당 이름을 가진 시설이 없습니다.' })
  async findByName(@Query('name') name: string) {
    return await this.facilityService.findByName(name);
  }

  @Get(':id')
  @ApiOkResponse({ description: '시설 상세 조회 성공' })
  @ApiOperation({ summary: 'ID 기반 시설 조회' })
  @ApiNotFoundResponse({ description: '해당 ID를 가진 시설이 없습니다.' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.facilityService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: '시설이 성공적으로 추가되었습니다.' })
  @ApiOperation({ summary: '시설 추가' })
  async create(@Body() data: CreateFacilityDto) {
    return await this.facilityService.create(data);
  }

  @Patch(':id')
  @ApiOkResponse({ description: '시설 정보 수정 성공' })
  @ApiOperation({ summary: '시설 정보 수정' })
  @ApiNotFoundResponse({ description: '해당 ID를 사용하는 시설이 없습니다.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFacilityDto,
  ) {
    return await this.facilityService.update(id, data);
  }

  @Delete(':id')
  @ApiOkResponse({ description: '시설 삭제 성공' })
  @ApiOperation({ summary: '시설 정보 삭제' })
  @ApiNotFoundResponse({ description: '해당 ID를 사용하는 시설이 없습니다.' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.facilityService.delete(id);
  }
}
