import { Controller, Get } from "../../configs/decorators/http.decorators";

@Controller()
class HealthController {
  constructor() {}

  @Get('/health')
  getHealth() {
    return {
      status: "I'm alive"
    };
  }
}

export default HealthController;
