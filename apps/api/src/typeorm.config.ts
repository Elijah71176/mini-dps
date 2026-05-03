import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Customer } from '../src/customers/customers.entity';
import { Project } from '../src/projects/project.entity';
import { ServiceRequest } from '../src/request/request.entity';

const isAwsRds =
  process.env.DATABASE_URL?.includes('rds.amazonaws.com') ?? false;

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  ssl: isAwsRds
    ? {
        rejectUnauthorized: false,
      }
    : false,

  entities: [Customer, Project, ServiceRequest],
  migrations: ['src/migrations/*.ts'],
});