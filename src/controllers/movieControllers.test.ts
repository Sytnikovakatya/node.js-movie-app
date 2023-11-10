import { NextFunction, Request, Response } from 'express';

import * as movieControllers from './movieControllers'; 

import * as movieService from '../service/movie.service';
import * as genreService from '../service/genre.service';

import { IMovie } from '../interfaces/movie.interface';
import { IGenre } from '../interfaces/genre.interface';

jest.mock('../service/movie.service');
jest.mock('../service/genre.service');

const moviePayload : IMovie = {
    title: "Title123",
    description: "New Description",
    releaseDate: new Date(),
    genre: 
    ["653242eb994dd9b9efde00dd"]
}

describe('Movie Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all movies', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    const mockMovies: IMovie[] = [moviePayload];

    (movieService.getMovies as jest.Mock).mockResolvedValue(mockMovies);

    await movieControllers.getAllMovies(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(mockMovies);
  });

  it('should create a movie', async () => {
    const mockRequest = {
      body: moviePayload,
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    (movieService.createMovie as jest.Mock).mockResolvedValue(moviePayload);

    await movieControllers.createMovie(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(moviePayload);
  });

  it('should update a movie', async () => {
    const mockRequest = {
      params: { id: 'movieId' },
      body: { title: 'Updated Movie' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    const mockUpdatedMovie: IMovie = { _id: 'genreId', title: "Updated Movie",
    description: "New Description",
    releaseDate: new Date(),
    genre: 
    ["653242eb994dd9b9efde00dd"] };

    (movieService.updateMovie as jest.Mock).mockResolvedValue(mockUpdatedMovie);

    await movieControllers.updateMovie(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedMovie);
  });

  it('should delete a movie', async () => {
    const mockRequest = {
      params: { id: 'movieId' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    (movieService.removeMovie as jest.Mock).mockResolvedValue(null);

    await movieControllers.deleteMovie(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Movie deleted' });
  });

  describe('getMoviesByGenre', () => {
  it('should return movies by genre', async () => {
    const mockRequest = {
      params: { genreName: 'action' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    const mockGenre: IGenre = {
      _id: 'genreId',
      name: 'action',
    };

    const mockMovies: IMovie[] = [
      { _id: 'movie1', title: 'Movie 1', genre: ['genreId'], description: "New Description",
        releaseDate: new Date(), },
      { _id: 'movie2', title: 'Movie 2', genre: ['genreId'], description: "New Description",
        releaseDate: new Date(), },
    ];

    (genreService.getGenreByName as jest.Mock).mockResolvedValue(mockGenre);
    (movieService.getMoviesByGenre as jest.Mock).mockResolvedValue(mockMovies);

    await movieControllers.getMoviesByGenre(mockRequest, mockResponse);

   expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'success',
      count: mockMovies.length,
      data: {
        movies: mockMovies,
      },
    });
  
  });

  it('should handle genre not found', async () => {
    const mockRequest = {
      params: { genreName: 'UnknownGenre' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    (genreService.getGenreByName as jest.Mock).mockResolvedValue(null);

    await movieControllers.getMoviesByGenre(mockRequest, mockResponse);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Genre 'UnknownGenre' not found.",
    });
  });

  it('should handle no movies found for the genre', async () => {
    const mockRequest = {
      params: { genreName: 'drama' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    const mockGenre: IGenre = {
      _id: 'genreId',
      name: 'drama',
    };

    (genreService.getGenreByName as jest.Mock).mockResolvedValue(mockGenre);
    (movieService.getMoviesByGenre as jest.Mock).mockResolvedValue([]);

    await movieControllers.getMoviesByGenre(mockRequest, mockResponse);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });
});
});