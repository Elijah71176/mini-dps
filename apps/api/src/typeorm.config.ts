import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Customer } from '../src/customers/customers.entity';
import { Project } from '../src/projects/project.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Customer, Project],
  migrations: ['src/migrations/*.ts'],
});
