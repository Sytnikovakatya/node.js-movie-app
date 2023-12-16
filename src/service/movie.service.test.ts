import * as movieService from './movie.service'; 

import MovieModel from '../models/movies';
import GenreModel from '../models/genre';

import { IMovie } from '../interfaces/movie.interface';

jest.mock('../models/movies', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findOneAndRemove: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

jest.mock('../models/genre', () => ({
  find: jest.fn(),
}));

describe('Movie Service', () => {
  const mockMovieData: IMovie = {
    title: 'Movie Title',
    description: 'Movie Description',
    releaseDate: new Date(),
    genre: ['Genre ID'],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a list of movies', async () => {
    (MovieModel.find as jest.Mock).mockResolvedValue([mockMovieData]);
    const movies = await movieService.getMovies();
    expect(movies).toEqual([mockMovieData]);
  });

  it('should create a new movie', async () => {
    (MovieModel.create as jest.Mock).mockResolvedValue(mockMovieData);
    const createdMovie = await movieService.createMovie(mockMovieData);
    expect(createdMovie).toEqual(mockMovieData);
  });

  it('should remove a movie', async () => {
    (MovieModel.findOneAndRemove as jest.Mock).mockResolvedValue(null);
    const removedMovie = await movieService.removeMovie('movieId');
    expect(removedMovie).toBeNull();
  });

  it('should update a movie', async () => {
    (MovieModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockMovieData);
    const updatedMovie = await movieService.updateMovie('movieId', mockMovieData);
    expect(updatedMovie).toEqual(mockMovieData);
  });

  it('should get movies by genre', async () => {
    (MovieModel.find as jest.Mock).mockResolvedValue([mockMovieData]);
    (GenreModel.find as jest.Mock).mockResolvedValue([{ _id: 'Genre ID', name: 'Genre Name' }]);
    const moviesByGenre = await movieService.getMoviesByGenre('Genre ID');
    expect(moviesByGenre).toEqual([mockMovieData]);
  });
});