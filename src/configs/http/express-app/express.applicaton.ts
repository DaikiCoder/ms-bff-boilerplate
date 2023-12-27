/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, Request, Response, Router } from 'express';
import { DecoratorData } from '../../decorators/types.decorators';
import { HttpApplication, HttpController, HttpTypes } from '../types.factory';

class ExpressApplication implements HttpApplication {
  private app: Express;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router();

    /* this.router.get('/test/:id', async (req: Request, res: Response) => {
      console.log('req: ', req.params.dsa);
      console.log('req: ', req.query);
      res.send(200);
    }); */

    this.app.use(this.router);
  }

  addCtrls(appCtrl: HttpController, decoratedData: DecoratorData) {
    for (const ctrl of appCtrl.controllers) {
      const decoratedCtrl = decoratedData.controllers.find(
        (decoCtrl) => ctrl.name === decoCtrl.ctrlClassName
      );
      if (!decoratedCtrl) {
        continue;
      }

      console.log('decoCtrl: ', decoratedCtrl);
      for (const decoFuncs of decoratedCtrl.ctrlFunctions) {

        if (decoFuncs.type === HttpTypes.GET) {

          this.router.get(decoFuncs.url, async (req: Request, res: Response) => {
            console.log('req', req.body);
            const params: any[] = []; // Array para almacenar los valores de los parámetros

            // Validar que los nombres de los parámetros estén presentes en req.params
            if (!decoFuncs.paramNames?.every((paramName) => paramName in req.params)) {
              // Enviar un error si los n ombres de los parámetros no coinciden
              res.status(400).send('Parámetros de solicitud incorrectos');
              return;
            }

            // Recorrer los nombres de los parámetros y asignarlos desde req.params
            decoFuncs.paramNames?.forEach((paramName) => {
              params.push(req.params[paramName]);
            });

            // Llamar a la función con los parámetros recopilados
            decoFuncs.func(...params);

            res.sendStatus(200);
          });
        }
      }
    }
  }

  async listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server Running on port: ${port}`);
    });
  }
}

export default ExpressApplication;
