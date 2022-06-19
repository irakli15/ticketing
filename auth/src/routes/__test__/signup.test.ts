import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns a 401 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'testtest.com', password: 'password' })
    .expect(400);
});

it('returns a 401 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'pa' })
    .expect(400);
});

it('returns a 401 with an invalid missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'pa' })
    .expect(400);
});
