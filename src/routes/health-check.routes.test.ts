import request from 'supertest';

import express from 'express';

import healthCheckRouter from './health-check.routes';

const app = express();

app.use('/health-check', healthCheckRouter);

describe('Health Check Route', () => {
  it('should return health check information', async () => {
    const response = await request(app).get('/health-check');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('message', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });
});