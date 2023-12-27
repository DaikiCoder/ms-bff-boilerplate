/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpressApplication from './express-app/express.applicaton';
import { httpDecoratedData } from '../decorators/http.decorators';
import { HttpController } from './types.factory';

class HttpFactory {

  static async create(ctrl: new () => object): Promise<ExpressApplication> {
    return new Promise((resolve) => {
      const app = new ExpressApplication();

      const appCtrl = new ctrl() as HttpController;
      app.addCtrls(appCtrl, httpDecoratedData);

      resolve(app);
    });
  }
}

export default HttpFactory;

/* const app = new http();
      httpInstance = app; */

/* static async create<T extends HttpApplication>(ctrl: new () => HttpController<T>): Promise<T> {
  return new Promise<T>((resolve) => {
    const appController = new ctrl();
    const app = appController.initialize();
    HttpFactory.httpInstance = app;
    resolve(app);
  });
} */

/* static async create<T extends HttpApplication>(http: new () => T) {
  return new Promise<T>((resolve) => {
    const app = new http();
    httpInstance = app;
    resolve(app as unknown as PromiseLike<T>);
  });
} */
