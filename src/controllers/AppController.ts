import { Module } from '../configs/decoratos/http.decoratos';
import ExampleController from './health/ExampleController';
import HealthController from './health/HealthController';

@Module({
  controller: [HealthController, ExampleController],
})
class AppController {}

export default AppController;
