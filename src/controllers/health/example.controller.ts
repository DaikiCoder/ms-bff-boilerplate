import { Controller, Get } from "../../configs/decorators/http.decorators";

@Controller()
class ExampleController {
  constructor() {}

  @Get('/example/:id')
  getExample(id: number) {
    console.log('example: ', id);
    return id;
  }

  @Get('/example2/:id')
  getExample2(id: number) {
    console.log('example2: ', id);
    return id;
  }
}

export default ExampleController;
