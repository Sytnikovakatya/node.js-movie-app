import { Router } from 'express';
import * as genreControllers from '../controllers/genreControllers';
import * as genreValidationRules from '../middleware/genreValidationRules';

const router = Router();

router.get('/', genreControllers.getAllGenres);
router.post('/', genreControllers.createGenre, genreValidationRules.genreCreateRules);
router.patch('/:id', genreControllers.updateGenre, genreValidationRules.genreUpdateRules);
router.delete('/:id', genreControllers.deleteGenre, genreValidationRules.genreDeleteRules);

export default router;