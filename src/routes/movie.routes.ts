import { Router } from 'express';
import * as movieControllers from '../controllers/movieControllers';
import * as movieValidationRules from '../middleware/movieValidationRules';

const router = Router();

router.get('/', movieControllers.getAllMovies);
router.post('/', movieControllers.createMovie, movieValidationRules.createRules)
router.patch('/:id', movieControllers.updateMovie, movieValidationRules.updateRules);
router.delete('/:id', movieControllers.deleteMovie, movieValidationRules.deleteRules);
router.get('/genre/:genreName', movieControllers.getMoviesByGenre);

export default router;