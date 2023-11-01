import { Router } from 'express';
import * as movieControllers from '../controllers/movieControllers';
import * as movieValidationRules from '../middleware/movieValidationRules';

const router = Router();

router.get('/', movieControllers.getAllMovies);
router.post('/', movieValidationRules.createRules, movieControllers.createMovie)
router.patch('/:id', movieValidationRules.updateRules, movieControllers.updateMovie);
router.delete('/:id', movieValidationRules.deleteRules, movieControllers.deleteMovie);
router.get('/genre/:genreName', movieControllers.getMoviesByGenre);

export default router;