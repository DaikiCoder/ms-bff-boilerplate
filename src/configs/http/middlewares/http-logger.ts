import morgan, { StreamOptions } from 'morgan';
import logger from '../../utils/logger';
import { ENV_LIST, NODE_ENV } from '../../env.configs';
import { Request, Response } from 'express';

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = (_req: Request, res: Response) => {
  const env = NODE_ENV || 'dev';
  return res.statusCode < 400 && env !== ENV_LIST.DEV && false;
};

const morganMiddleware = () =>
  morgan(':method :url :status - :response-time ms', {
    stream,
    skip,
  });

export default morganMiddleware;
