import { NextFunction, Request, Response } from 'express';

import * as genreControllers from './genreControllers'; 

import * as genreService from '../service/genre.service';

import { IGenre } from '../interfaces/genre.interface';

jest.mock('../service/genre.service');

describe('Genre Controllers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all genres', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    const mockGenres: IGenre[] = [{ name: 'Genre 1' }, { name: 'Genre 2' }];

    (genreService.getGenres as jest.Mock).mockResolvedValue(mockGenres);

    await genreControllers.getAllGenres(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(mockGenres);
  });

  it('should create a genre', async () => {
    const mockRequest = {
      body: { name: 'New Genre' },
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    const mockNewGenre: IGenre = { name: 'New Genre' };

    (genreService.createGenre as jest.Mock).mockResolvedValue(mockNewGenre);

    await genreControllers.createGenre(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNewGenre);
  });

  describe('getMoviesByGenre', () => {
    it('should update a genre', async () => {
      const mockRequest = {
        params: { id: 'genreId' },
        body: { name: 'Updated Genre' },
      } as unknown as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn() as unknown as NextFunction;

      const mockUpdatedGenre: IGenre = { _id: 'genreId', name: 'Updated Genre' };

      (genreService.updateGenre as jest.Mock).mockResolvedValue(mockUpdatedGenre);

      await genreControllers.updateGenre(mockRequest, mockResponse, mockNext);

      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedGenre);
    });

    it('should handle not genre found', async () => {
    const mockRequest = {
      params: { id: 'unknownId' },
      body: { name: 'Updated Genre' },
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    (genreService.updateGenre as jest.Mock).mockResolvedValue(null);

    await genreControllers.updateGenre(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Genre not found' });
  });
})

  it('should delete a genre', async () => {
    const mockRequest = {
      params: { id: 'genreId' },
    } as unknown as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as unknown as NextFunction;

    (genreService.removeGenre as jest.Mock).mockResolvedValue(null);

    await genreControllers.deleteGenre(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Genre deleted' });
  });
});