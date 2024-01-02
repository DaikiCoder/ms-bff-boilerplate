/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { GenericResponse } from '../types.factory';
import logger from '../../utils/logger';

export const errorHandler =
  () => (err: Error, req: Request, res: Response, _next: NextFunction) => {
    const genericError: GenericResponse = { success: false };
    genericError.error = {
      code: 400,
      message: err.message,
    };

    res.status(400);
    res.json(genericError);

    logger.error({
      code: res.statusCode,
      codeMessage: res.statusMessage,
      errorMessage: err.message,
      body: req.body,
    });
  };
