import GenreModel, { GenreDocument } from '../models/genre';
import { IGenre } from '../interfaces/genre.interface';

export const getGenres = async (): Promise<GenreDocument[]> => {
  return GenreModel.find();
};

export const getGenreByName = async (
  name: string
): Promise<GenreDocument | null> => {
  return GenreModel.findOne({ name: name });
};

export const removeGenre = async (id: string): Promise<void | null> => {
  return GenreModel.findOneAndRemove({ _id: id });
};

export const createGenre = async (data: IGenre): Promise<GenreDocument> => {
  return GenreModel.create(data);
};

export const updateGenre = async (
  id: string,
  data: IGenre
): Promise<GenreDocument | null> => {
  return GenreModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true
  });
};

