import request from 'supertest';
import express from 'express';
import movieRouter from './movie.routes';
import * as movieControllers from '../controllers/movieControllers';

// Mock the controllers and middleware
jest.mock('../controllers/movieControllers');
jest.mock('../middleware/movieValidationRules');

// Create an Express app and use the movie router
const app = express();
app.use('/movies', movieRouter);

describe('Movie Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all movies', async () => {
    // Mock the getAllMovies controller
    (movieControllers.getAllMovies as jest.Mock).mockImplementation((req, res) => {
      res.json([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
    });

    // Send a GET request to the /movies endpoint
    const response = await request(app).get('/movies');

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
  });

  it('should create a new movie', async () => {
    // Mock the createMovie controller
    (movieControllers.createMovie as jest.Mock).mockImplementation((req, res) => {
      res.status(201).json({ title: 'New Movie' });
    });

    // Send a POST request to the /movies endpoint with data
    const response = await request(app).post('/movies').send({ title: 'New Movie' });

    // Assert the response
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ title: 'New Movie' });
  });

  it('should update a movie', async () => {
    // Mock the updateMovie controller
    (movieControllers.updateMovie as jest.Mock).mockImplementation((req, res) => {
      res.json({ title: 'Updated Movie' });
    });

    // Send a PATCH request to the /movies/:id endpoint with data
    const response = await request(app).patch('/movies/123').send({ title: 'Updated Movie' });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ title: 'Updated Movie' });
  });

  it('should delete a movie', async () => {
    // Mock the deleteMovie controller
    (movieControllers.deleteMovie as jest.Mock).mockImplementation((req, res) => {
      res.json({ message: 'Movie deleted' });
    });

    // Send a DELETE request to the /movies/:id endpoint
    const response = await request(app).delete('/movies/123');

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Movie deleted' });
  });

  it('should get movies by genre', async () => {
    // Mock the getMoviesByGenre controller
    (movieControllers.getMoviesByGenre as jest.Mock).mockImplementation((req, res) => {
      res.json({ status: 'success', count: 2, data: { movies: [{ title: 'Action Movie' }, { title: 'Drama Movie' }] } });
    });

    // Send a GET request to the /movies/genre/:genreName endpoint
    const response = await request(app).get('/movies/genre/Action');

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      count: 2,
      data: { movies: [{ title: 'Action Movie' }, { title: 'Drama Movie' }] },
    });
  });
});