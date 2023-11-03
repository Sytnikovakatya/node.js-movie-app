import { body, param } from 'express-validator';

export const genreCreateRules = [body('name').trim().notEmpty().withMessage('Name is required')];

export const genreUpdateRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];
export const genreDeleteRules = [
  param('id').trim().isHexadecimal().isLength({ min: 24, max: 24 }).withMessage('Invalid ID'),
];