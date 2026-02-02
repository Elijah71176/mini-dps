import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Customer } from '../src/customers/customers.entity';
import { Project } from '../src/projects/project.entity';

const isProd = process.env.NODE_ENV === 'production';


export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
    ssl: isProd ? { rejectUnauthorized: false } : false,

  entities: [Customer, Project],
  migrations: ['src/migrations/*.ts'],
});
