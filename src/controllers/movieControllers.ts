import { NextFunction, Request, Response } from 'express';

import * as movieService from "../service/movie.service";
import * as genreService from "../service/genre.service";

import { IMovie } from '../interfaces/movie.interface';
import { IGenre } from '../interfaces/genre.interface';



export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies: IMovie[] = await movieService.getMovies();
        res.json(movies);
    } catch(err) {
        next(err);
    }
};

export const createMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newMovie = await movieService.createMovie(req.body);
        res.status(201).json(newMovie);
    } catch (err) {
        next(err);
    }
};

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => { 
   try {
        const id: string = req.params.id;
        const updatedMovie: IMovie|null = await movieService.updateMovie(id, req.body);
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
        await movieService.removeMovie(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        next(err);
    }
};

export const getMoviesByGenre = async (req: Request, res: Response) => {
  const genreName = req.params.genreName;
  const genre: IGenre | null = await genreService.getGenreByName(genreName);
 
  if (!genre?._id) {
    return res.status(404).json({ message: `Genre '${genreName}' not found.` });
  }
  const movies: IMovie[] = await movieService.getMoviesByGenre(genre._id);
  if (!movies.length) {
    return res.sendStatus(204);
  }
  res.json({
    status: 'success',
      count: movies.length,
      data: {
        movies,
      },
  });
};