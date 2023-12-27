import { Controller, Get } from "../../configs/decorators/http.decorators";

@Controller()
class HealthController {
  constructor() {}

  @Get('/health/:id')
  getHealth(id: number) {
    console.log('health: ', id);
    return id;
  }
}

export default HealthController;
