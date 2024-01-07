/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, NextFunction, Request, Response, Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DecoratedFunc, DecoratorData } from '../../decorators/types.decorators';
import { GenericResponse, HttpApplication, HttpController, HttpTypes } from '../types.factory';
import { errorHandler } from '../middlewares/error-handler';
import morganMiddleware from '../middlewares/http-logger';
import logger from '../../utils/logger';

class ExpressApplication implements HttpApplication {
  private app: Express;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router();

    const rateLimitConfig = {
      windowMs: 15 * 60 * 1000, // 15 min
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
    };

    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morganMiddleware());
    this.app.use(rateLimit(rateLimitConfig));
    this.app.disable('x-powered-by');
    this.app.use(express.json());

    this.app.use(this.router);

    this.app.use(errorHandler());
  }

  addCtrls(appCtrl: HttpController, decoratedData: DecoratorData) {
    for (const ctrl of appCtrl.controllers) {
      const ctrlInst = new ctrl();
      const decoratedCtrl = decoratedData.controllers.find(
        (decoCtrl) => ctrl.name === decoCtrl.ctrlClassName
      );
      if (!decoratedCtrl) {
        continue;
      }

      this.registerController(ctrl.name, ctrlInst, decoratedCtrl.ctrlFunctions);
    }
  }

  private registerController(ctrlName: string, ctrlInst: any, decoratedFuncs: DecoratedFunc[]) {
    for (const decoFuncs of decoratedFuncs) {
      logger.info(`\x1b[33m[${ctrlName}] \x1b[32m Mapped { ${decoFuncs.url} ${decoFuncs.type} } route`);

      switch (decoFuncs.type) {
        case HttpTypes.GET:
          this.createGetRoutes(ctrlInst, decoFuncs);
          break;
        case HttpTypes.POST:
          this.createPostRoutes(ctrlInst, decoFuncs);
          break;
      }
    }
  }

  private createGetRoutes(ctrlInst: any, decoFuncs: DecoratedFunc) {
    this.router.get(decoFuncs.url, async (req: Request, res: Response, next: NextFunction) => {
      const genericRes: GenericResponse = { success: true };
      const params = decoFuncs.paramNames?.map((paramName: string) => req.params[paramName]) || [];

      try {
        logger.info(`Start ${decoFuncs.name as string}`);
        genericRes.data = await ctrlInst[decoFuncs.name](...params);

        if (Math.random() > 0.5) throw new Error('boom!');

        logger.info(`End   ${decoFuncs.name as string}`);
        res.status(200).json(genericRes);
      } catch (err: any) {
        next(err);
      }
    });
  }

  private createPostRoutes(ctrlInst: any, decoFuncs: DecoratedFunc) {
    this.router.post(decoFuncs.url, async (req: Request, res: Response, next: NextFunction) => {
      const genericRes: GenericResponse = { success: true };

      try {
        logger.info(`Start ${decoFuncs.name as string}`);
        genericRes.data = await ctrlInst[decoFuncs.name](req.body);

        if (Math.random() > 0.5) throw new Error('boom!');

        logger.info(`End   ${decoFuncs.name as string}`);
        res.status(200).json(genericRes);
      } catch (err: any) {
        next(err);
      }
    });
  }

  async listen(port: number) {
    await this.app.listen(port);
    logger.info(`\x1b[33m[${ExpressApplication.name}] \x1b[32mServer Listening on port: ${port}`);
  }
}

export default ExpressApplication;
