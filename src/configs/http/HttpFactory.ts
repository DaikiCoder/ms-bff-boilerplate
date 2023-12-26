/* eslint-disable @typescript-eslint/no-explicit-any */
import ExpressApplication from './express-app/ExpressApplication';
import { HttpDecoratorData, httpDecoratedData } from '../decoratos/http.decoratos';

export interface HttpApplication {
  addCtrls(ctrls: HttpController, httpDecoratorData: HttpDecoratorData): void;
  listen(port: number): void;
}

export interface IController {
  new (): any;
}
export interface HttpController {
  controllers: IController[];
}

export const enum HttpTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

class HttpFactory {
  static httpInstance: HttpApplication;

  static async create(ctrl: new () => object): Promise<ExpressApplication> {
    return new Promise((resolve) => {
      const app = new ExpressApplication();
      httpInstance = app;

      const appCtrl = new ctrl() as HttpController;
      app.addCtrls(appCtrl, httpDecoratedData);

      resolve(app);
    });
  }
}

export default HttpFactory;
export let { httpInstance } = HttpFactory;

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
