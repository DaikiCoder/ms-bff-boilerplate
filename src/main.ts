import { PORT } from './configs/envConfigs';
import HttpFactory from './configs/http/HttpFactory';
import AppController from './controllers/AppController';

async function bootstrap() {
  const app = await HttpFactory.create(AppController);

  await app.listen(PORT);
}

bootstrap();
