export interface HttpApplication {
  listen(port: number): void
}

class HttpFactory {
  static httpInstance: HttpApplication;

  static async create<T extends HttpApplication>(http: new () => T) {
    return new Promise<T> ((resolve) => {
      const app = new http();
      httpInstance = app;
      resolve(app as unknown as PromiseLike<T>);
    });
  }
}

export default HttpFactory;
export let { httpInstance } = HttpFactory;
