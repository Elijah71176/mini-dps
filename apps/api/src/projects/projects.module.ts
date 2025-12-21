import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Customer } from '../customers/customers.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Customer])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
