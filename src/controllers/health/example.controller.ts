import { Controller, Get } from "../../configs/decorators/http.decorators";

@Controller()
class ExampleController {
  constructor() {}

  @Get('/example/:id')
  async getExample(id: number) {
    console.log('example: ', id);
    /* const resp = await useCase(id); */
    return id;
  }

  @Get('/example2/:id')
  async getExample2(id: number) {
    console.log('example2: ', id);
    return id;
  }
}

export default ExampleController;
