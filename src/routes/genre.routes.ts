import { Router } from 'express';
import * as genreControllers from '../controllers/genreControllers';
import * as genreValidationRules from '../middleware/genreValidationRules';

const router = Router();

router.get('/', genreControllers.getAllGenres);
router.post('/', genreValidationRules.genreCreateRules, genreControllers.createGenre);
router.patch('/:id', genreValidationRules.genreUpdateRules, genreControllers.updateGenre);
router.delete('/:id',  genreValidationRules.genreDeleteRules,  genreControllers.deleteGenre);

export default router;