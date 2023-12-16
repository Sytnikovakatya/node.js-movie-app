import request from 'supertest';
import express from 'express';
import movieRouter from './movie.routes';
import * as movieControllers from '../controllers/movieControllers';

jest.mock('../controllers/movieControllers');
jest.mock('../middleware/movieValidationRules');

const app = express();
app.use('/movies', movieRouter);

describe('Movie Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all movies', async () => {
    (movieControllers.getAllMovies as jest.Mock).mockImplementation((req, res) => {
      res.json([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
    });

    const response = await request(app).get('/movies');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
  });

  it('should create a new movie', async () => {
    (movieControllers.createMovie as jest.Mock).mockImplementation((req, res) => {
      res.status(201).json({ title: 'New Movie' });
    });

    const response = await request(app).post('/movies').send({ title: 'New Movie' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ title: 'New Movie' });
  });

  it('should update a movie', async () => {
    (movieControllers.updateMovie as jest.Mock).mockImplementation((req, res) => {
      res.json({ title: 'Updated Movie' });
    });

    const response = await request(app).patch('/movies/123').send({ title: 'Updated Movie' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ title: 'Updated Movie' });
  });

  it('should delete a movie', async () => {
    (movieControllers.deleteMovie as jest.Mock).mockImplementation((req, res) => {
      res.json({ message: 'Movie deleted' });
    });

    const response = await request(app).delete('/movies/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Movie deleted' });
  });

  it('should get movies by genre', async () => {
    (movieControllers.getMoviesByGenre as jest.Mock).mockImplementation((req, res) => {
      res.json({ status: 'success', count: 2, data: { movies: [{ title: 'Action Movie' }, { title: 'Drama Movie' }] } });
    });

    const response = await request(app).get('/movies/genre/Action');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      count: 2,
      data: { movies: [{ title: 'Action Movie' }, { title: 'Drama Movie' }] },
    });
  });
});