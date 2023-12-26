import { Controller, Get } from "../../configs/decoratos/http.decoratos";

@Controller()
class HealthController {
  constructor() {}

  @Get('path/to/url/:id')
  getHealth(id: number) {
    console.log('health: ', id);
    return id;
  }
}

export default HealthController;
