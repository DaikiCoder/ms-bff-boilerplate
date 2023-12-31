import { Controller, Get, Post } from '../../configs/decorators/http.decorators';

@Controller()
class ExampleController {
  constructor() {}

  @Get('/example/:id')
  async getExample(id: number) {
    console.log('getExample: ', id);
    /* const resp = await getUseCase(id); */
    return { id };
  }

  @Post('/example')
  async postExample({ id }: { id: number }) {
    console.log('postExample: ', id);
    /* const resp = await postUseCase(id); */
    return { id };
  }
}

export default ExampleController;
