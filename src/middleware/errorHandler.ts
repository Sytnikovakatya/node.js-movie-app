import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
 const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });

  next();
};