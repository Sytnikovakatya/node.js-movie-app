import { NextFunction, Request, Response } from 'express';

import * as genreService from "../service/genre.service";

import { IGenre } from '../interfaces/genre.interface';

export const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres: IGenre[] = await genreService.getGenres();
        res.json(genres);
    } catch(err) {
        next(err);
    }
};

export const createGenre =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGenre: IGenre = await genreService.createGenre(req.body);
        res.status(201).json(newGenre);
    } catch (err) {
        next(err);
    }
};

export const updateGenre = async (req: Request, res: Response, next: NextFunction) => { 
   try {
        const id: string = req.params.id;
        const updatedGenre: IGenre|null = await genreService.updateGenre(id, req.body);
        if (!updatedGenre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(updatedGenre);
    } catch (err) {
        next(err);
    }
};

export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await genreService.removeGenre(req.params.id);
        res.json({ message: 'Genre deleted' });
    } catch (err) {
        next(err);
    }
};
