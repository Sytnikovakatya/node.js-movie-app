import * as genreService from './genre.service'; 

import GenreModel from '../models/genre';

import { IGenre } from '../interfaces/genre.interface';

jest.mock('../models/genre', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndRemove: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

describe('Genre Service', () => {
  const mockGenreData: IGenre = {
    name: 'Genre Name',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a list of genres', async () => {
    (GenreModel.find as jest.Mock).mockResolvedValue([mockGenreData]);
    const genres = await genreService.getGenres();
    expect(genres).toEqual([mockGenreData]);
  });

  it('should get a genre by name', async () => {
    (GenreModel.findOne as jest.Mock).mockResolvedValue(mockGenreData);
    const genre = await genreService.getGenreByName('Genre Name');
    expect(genre).toEqual(mockGenreData);
  });

  it('should create a new genre', async () => {
    (GenreModel.create as jest.Mock).mockResolvedValue(mockGenreData);
    const createdGenre = await genreService.createGenre(mockGenreData);
    expect(createdGenre).toEqual(mockGenreData);
  });

  it('should remove a genre', async () => {
    (GenreModel.findOneAndRemove as jest.Mock).mockResolvedValue(null);
    const removedGenre = await genreService.removeGenre('genreId');
    expect(removedGenre).toBeNull();
  });

  it('should update a genre', async () => {
    (GenreModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockGenreData);
    const updatedGenre = await genreService.updateGenre('genreId', mockGenreData);
    expect(updatedGenre).toEqual(mockGenreData);
  });
});