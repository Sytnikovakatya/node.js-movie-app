import { NextFunction, Request, Response } from 'express';

import GenreModel from '../models/genre';

import { IGenre } from '../interfaces/genre.interface';

export const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres: IGenre[] = await GenreModel.find();
        res.json(genres);
    } catch(err) {
        next(err);
    }
};

export const createGenre =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGenre: IGenre = await GenreModel.create(req.body);
        res.status(201).json(newGenre);
    } catch (err) {
        next(err);
    }
};

export const updateGenre = async (req: Request, res: Response, next: NextFunction) => { 
   try {
        const id: string = req.params.id;
        const updatedGenre: IGenre|null = await GenreModel.findByIdAndUpdate(id, req.body, { new: true });
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
        await GenreModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Genre deleted' });
    } catch (err) {
        next(err);
    }
};
