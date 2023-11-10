import request from 'supertest';

import app from './index';

describe('App Tests', () => {
  it('should return home page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Home Page');
  });

  it('should return about page', async () => {
    const response = await request(app).get('/about');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'This is About Page' });
  });

   it('should return movies page', async () => {
    const response = await request(app).get('/movies');
    expect(response.status).toBe(200);
  });

  it('should handle unknown routes and return a 404 status', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});