import request from 'supertest';

import express from 'express';

import genreRouter from './genre.routes';

import * as genreControllers from '../controllers/genreControllers';

jest.mock('../controllers/genreControllers');
jest.mock('../middleware/genreValidationRules');

const app = express();

app.use('/genres', genreRouter);

describe('Genre Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all genres', async () => {
    (genreControllers.getAllGenres as jest.Mock).mockImplementation((req, res) => {
      res.json([{ name: 'Action' }, { name: 'Drama' }]);
    });

    const response = await request(app).get('/genres');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Action' }, { name: 'Drama' }]);
  });

  it('should create a new genre', async () => {
    (genreControllers.createGenre as jest.Mock).mockImplementation((req, res) => {
      res.status(201).json({ name: 'Thriller' });
    });

    const response = await request(app).post('/genres').send({ name: 'Thriller' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ name: 'Thriller' });
  });

  it('should update a genre', async () => {
    (genreControllers.updateGenre as jest.Mock).mockImplementation((req, res) => {
      res.json({ name: 'Updated Genre' });
    });

    const response = await request(app).patch('/genres/123').send({ name: 'Updated Genre' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'Updated Genre' });
  });

  it('should delete a genre', async () => {
    (genreControllers.deleteGenre as jest.Mock).mockImplementation((req, res) => {
      res.json({ message: 'Genre deleted' });
    });

    const response = await request(app).delete('/genres/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Genre deleted' });
  });
});