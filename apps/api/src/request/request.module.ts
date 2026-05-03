import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { ServiceRequest } from './request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRequest])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}