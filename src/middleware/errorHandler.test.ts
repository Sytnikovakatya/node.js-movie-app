import { Request, Response, NextFunction } from 'express';

import { validationResult } from 'express-validator';

import { errorHandler } from './errorHandler';

jest.mock('express-validator');

describe('Error Handler Middleware', () => {
  it('should handle validation errors', () => {
    const validationErrors = [
      { msg: 'Validation error 1', param: 'field1', value: 'invalidValue1', location: 'body', type: 'alternative'},
      { msg: 'Validation error 2', param: 'field2', value: 'invalidValue2', location: 'body', type: 'alternative'},
    ];

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

     (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue(validationErrors),
    });


    errorHandler(new Error('Validation error'), req, res, next);

    expect(validationResult).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: validationErrors });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle internal server errors', () => {

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });

    const error = new Error('Some error');
    errorHandler(error, req, res, next);

    expect(validationResult).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(next).toHaveBeenCalled();
  });
});