import mongoose, {  Schema } from 'mongoose';

import { HydratedDocument } from "mongoose";

import { IMovie } from '../interfaces/movie.interface';

export type MovieDocument = HydratedDocument<IMovie>;

const movieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
   releaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  genre: {
    type: [Schema.Types.ObjectId],
    ref: 'Genre',
    required: true,
  },
});

const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);

export default MovieModel;