import { Body, Controller, Get, Post } from '../../configs/decorators/http.decorators';
import { ExampleBodySchema, TExampleBody } from './example.dto';

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
  async postExample(body: TExampleBody) {
    console.log('postExample: ', body);
    /* const resp = await postUseCase(id); */
    return body;
  }

  // @Params(['id', 'type'])
  @Body<TExampleBody>('exampleBody', ExampleBodySchema)
  @Post('/example2/:id')
  async getExampleBody(exampleBody: TExampleBody) {
    console.log('post ExampleBody:', exampleBody);
    /* const resp = await getUseCase(id); */
    return exampleBody;
  }
}

export default ExampleController;
