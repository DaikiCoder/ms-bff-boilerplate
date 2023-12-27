import { Module } from '../configs/decorators/http.decorators';
import ExampleController from './health/example.controller';
import HealthController from './health/health.controller';

@Module({
  controller: [HealthController, ExampleController],
})
class AppModule {}

export default AppModule;
