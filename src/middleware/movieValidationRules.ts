import { body, param } from 'express-validator';

export const createRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('releaseDate').trim().notEmpty().withMessage('Release date is required'),
  body('releaseDate').isDate().withMessage('Invalid release date'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('genre').isMongoId().withMessage('Invalid genre'),
];

export const updateRules = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
  body('releaseDate').isDate().withMessage('Invalid release date'),
  body('genres').isMongoId().withMessage('Invalid genres'),
];

export const deleteRules = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];