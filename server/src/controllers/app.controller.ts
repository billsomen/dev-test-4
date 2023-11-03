import { Service } from "typedi";
import { Middleware } from "../custom-types/express-middleware";

@Service()
class AppController {
  index: Middleware = (_req, res) => {
    res.json({ server: "Rest API server", status: "online" });
  };
}

export default AppController;