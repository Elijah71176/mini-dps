import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Projects (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clear tables between tests (FK order matters)
    await dataSource.query('DELETE FROM project;');
    await dataSource.query('DELETE FROM customer;');
  });

  it('POST /projects creates a project (with real DB)', async () => {
    const customerRes = await request(app.getHttpServer())
      .post('/customers')
      .send({ name: 'Test Customer', email: 'testcustomer@example.com' })
      .expect(201);

    const customerId = customerRes.body.id;

    const projectRes = await request(app.getHttpServer())
      .post('/projects')
      .send({ customerId, title: 'My Project', status: 'planned' })
      .expect(201);

    expect(projectRes.body.id).toBeDefined();
    expect(projectRes.body).toMatchObject({
      customerId,
      title: 'My Project',
      status: 'planned',
    });
  });

  it('GET /projects returns created projects', async () => {
    const customerRes = await request(app.getHttpServer())
      .post('/customers')
      .send({ name: 'Test Customer 2', email: 'testcustomer2@example.com' })
      .expect(201);

    const customerId = customerRes.body.id;

    await request(app.getHttpServer())
      .post('/projects')
      .send({ customerId, title: 'Project A', status: 'active' })
      .expect(201);

    const listRes = await request(app.getHttpServer())
      .get('/projects')
      .expect(200);

    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThanOrEqual(1);
  });
});
