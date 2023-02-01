import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/{value} (GET) - Return true', async () => {
    const res = await request(app.getHttpServer())
      .get('/10');

    expect(res.status).toBe(200);
    expect(res.body.data).toBe('(1, 0)');
  });

  it('/{value} (GET) - Invalid', async () => {
    const res = await request(app.getHttpServer())
      .get('/530');

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(false);
  });

  it('/login (POST) - Success login', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'john',
        password: 'Th3password',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('/login (POST) - Fail login', async () => {
    const res = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'john',
        password: 'Wrongpassword',
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
