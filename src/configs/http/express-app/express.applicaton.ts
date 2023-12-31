/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { DecoratedFunc, DecoratorData } from '../../decorators/types.decorators';
import { GenericResponse, HttpApplication, HttpController, HttpTypes } from '../types.factory';
import { errorHandler } from '../middlewares/error.handler';

class ExpressApplication implements HttpApplication {
  private app: Express;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router(); 

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

      this.registerController(ctrlInst, decoratedCtrl.ctrlFunctions);
    }
  }

  private registerController(ctrlInst: any, decoratedFuncs: DecoratedFunc[]) {
    for (const decoFuncs of decoratedFuncs) {
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
        genericRes.data = await ctrlInst[decoFuncs.name](...params);

        if (Math.random() > .5)
          throw new Error('boom!');

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
        genericRes.data = await ctrlInst[decoFuncs.name](req.body);

        if (Math.random() > .5)
          throw new Error('boom!');

        res.status(200).json(genericRes);
      } catch (err: any) {
        next(err);
      }
    });
  }

  async listen(port: number) {
    await this.app.listen(port);
    console.log(`Server Running on port: ${port}`);
  }
}

export default ExpressApplication;
