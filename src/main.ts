import { PORT } from './configs/env.configs';
import HttpFactory from './configs/http/http.factory';
import AppModule from './controllers/app.module';

async function bootstrap() {
  const app = await HttpFactory.create(AppModule);

  await app.listen(PORT);
}

bootstrap();
