import { HttpApplication, httpInstance } from "../HttpFactory";

class ExpressApplication implements HttpApplication {

  constructor() {}
  
  async listen(port: number) {
    return new Promise(() => {
      console.log(`Server Running on port: ${port}`);
      console.log(httpInstance);
    });
  }

}

export default ExpressApplication;