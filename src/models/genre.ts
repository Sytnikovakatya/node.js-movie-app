import mongoose, { Schema } from 'mongoose';

import { HydratedDocument } from "mongoose";

import { IGenre } from '../interfaces/genre.interface';

export type GenreDocument = HydratedDocument<IGenre>;

const genreSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const GenreModel = mongoose.model<IGenre>('Genre', genreSchema);

export default GenreModel;
