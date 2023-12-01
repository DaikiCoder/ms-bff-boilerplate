import { PORT } from "./configs/envConfigs";
import HttpFactory from "./configs/http/HttpFactory";
import ExpressApplication from "./configs/http/express-app/ExpressApplication";

async function bootstrap() {
  const app = await HttpFactory.create<ExpressApplication>(ExpressApplication);
  await app.listen(PORT);
}
bootstrap();
