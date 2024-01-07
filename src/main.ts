import { PORT } from './configs/env.configs';
import HttpFactory from './configs/http/http.factory';
import AppModule from './controllers/app.module';

async function bootstrap() {
  const app = await HttpFactory.create(AppModule);

  return await app.listen(PORT);
}

bootstrap();

/* 
import throng from 'throng';
throng({
  count: 4,
  master: () => {
    console.log('Started master.');
  },
  worker: async (workerId, disconnect) => {
    console.log(`Started worker ${workerId}`);

    bootstrap();

    const shutdown = () => {
      console.log(`Worker ${workerId} cleanup.`);
      disconnect();
    };

    process.once('SIGTERM', shutdown);
    process.once('SIGINT', shutdown);
  },
}); */
