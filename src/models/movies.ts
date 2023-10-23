import mongoose, {  Schema } from 'mongoose';
import { IMovie } from '../interfaces/movie.interface';

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
    ref: 'GenreModel',
    required: true,
  },
});

const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);

export default MovieModel;