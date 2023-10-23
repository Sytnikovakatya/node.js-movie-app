import { NextFunction, Request, Response } from 'express';

import MovieModel from '../models/movies';
import GenreModel from '../models/genre';

import { IMovie } from '../interfaces/movie.interface';
import { IGenre } from '../interfaces/genre.interface';


export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies: IMovie[] = await MovieModel.find();
        res.json(movies);
    } catch(err) {
        next(err);
    }
};

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newMovie: IMovie = await MovieModel.create(req.body);
        res.status(201).json(newMovie);
    } catch (err) {
        next(err);
    }
};

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => { 
   try {
        const id: string = req.params.id;
        const updatedMovie: IMovie|null = await MovieModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (err) {
        next(err);
    }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await MovieModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        next(err);
    }
};

export const getMoviesByGenre = async (req: Request, res: Response) => {
  const genreName = req.params.genreName;
  const genre: IGenre | null = await GenreModel.findOne({ name: genreName });
 
  if (!genre) {
    return res.status(400).json({ message: `Genre '${genreName}' not found.` });
  }
  const movies: IMovie[] = await MovieModel.find({ genre: genre._id });
  if (!movies.length) {
    return res.sendStatus(204);
  }
  res.status(200).json({
    status: 'success',
      count: movies.length,
      data: {
        movies,
      },
  });
};