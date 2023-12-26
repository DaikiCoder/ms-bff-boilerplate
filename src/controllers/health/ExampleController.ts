import { Controller, Get } from "../../configs/decoratos/http.decoratos";

@Controller()
class ExampleController {
  constructor() {}

  @Get('path/to/url/:id')
  getExample(id: number) {
    console.log('example: ', id);
    return id;
  }

  @Get('path/to/url/:id')
  getExample2(id: number) {
    console.log('example: ', id);
    return id;
  }
}

export default ExampleController;
