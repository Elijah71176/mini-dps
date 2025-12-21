import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Customer } from './customers/customers.entity';
import { Project, ProjectStatus } from './projects/project.entity';

const ds = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Customer, Project],
});

async function seed() {
  await ds.initialize();

  const customerRepo = ds.getRepository(Customer);
  const projectRepo = ds.getRepository(Project);

  //  Safely clear ALL data (handles FK constraints)
  await ds.query(
    `TRUNCATE TABLE "project", "customer" RESTART IDENTITY CASCADE`
  );

  // ---- Customers ----
  const acme = await customerRepo.save({
    name: 'Acme AB',
    email: 'info@acme.se',
  });

  const carryGo = await customerRepo.save({
    name: 'CarryGo',
    email: 'contact@carrygo.se',
  });

  // ---- Projects ----
  await projectRepo.save([
    {
      title: 'Website',
      status: ProjectStatus.PLANNED,
      customerId: acme.id,
    },
    {
      title: 'Mobile App',
      status: ProjectStatus.ACTIVE,
      customerId: acme.id,
    },
    {
      title: 'Internal System',
      status: ProjectStatus.DONE,
      customerId: carryGo.id,
    },
  ]);

  await ds.destroy();
  console.log('✅ Seed done');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
