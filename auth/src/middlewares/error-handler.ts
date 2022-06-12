import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../error/custom-error';

export interface CommonError {
  statusCode: number;
  serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
  console.log(err);
};
