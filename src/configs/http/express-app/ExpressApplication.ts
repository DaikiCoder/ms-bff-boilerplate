import express, { Express, Router } from 'express';
import { HttpApplication, HttpController } from '../HttpFactory';
import { HttpDecoratorData } from '../../decoratos/http.decoratos';

class ExpressApplication implements HttpApplication {
  private app: Express;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = express.Router();

    this.app.use(this.router);
  }

  addCtrls(ctrls: HttpController, decoratedData: HttpDecoratorData) {
    console.log('ctrls.controllers: ', ctrls.controllers);
    // console.log(`decoratedData: ${JSON.stringify(decoratedData)}`);
    console.log('decoratedData', decoratedData);

    console.log('zxcTest: ', decoratedData.controllers[1].ctrlFunctions[0].name);
    decoratedData.controllers[1].ctrlFunctions[0].func({});

    ctrls.controllers.forEach((ctrl) => {
      console.log('ctrl: ', ctrl);
      const ctrlInstance = new ctrl();
      console.log('ctrlInstanceName: ', ctrlInstance.constructor.name);
      /* (ctrlInstance.name)['getHealth']({id: 1}); */

    });
  }

  async listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server Running on port: ${port}`);
    });
  }
}

export default ExpressApplication;