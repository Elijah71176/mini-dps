

import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ParseUUIDPipe   } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  findAll() {
    return this.projects.findAll();
  }

  // ✅ MUST come before :id
  @Get('by-customer/:customerId')
  findByCustomer(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
  ) {
    return this.projects.findByCustomer(customerId);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.projects.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projects.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projects.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.projects.remove(id);
  }
}
