import UserService from "@services/user.service";
import { Service } from "typedi";
import { Middleware } from "../custom-types/express-middleware";

@Service()
class UserController {
  constructor(private readonly userService: UserService) {}

  create: Middleware = async (req, res) => {
    const { name, accessibility, price } = req.body;

    if (!name || !accessibility || !price) {
      return res.status(400).json({
        status: "error",
        message: "name, accessibility, price are required.",
      });
    }

    if (!["High", "Medium", "Low"].includes(accessibility)) {
      return res.status(400).json({
        status: "error",
        message: "accessibility should be either 'High', 'Medium', or 'Low'",
      });
    }

    if (!["Free", "Low", "High"].includes(price)) {
      return res.status(400).json({
        status: "error",
        message: "price should be either 'Free', 'Low', or 'High'",
      });
    }

    try {
      const user = await this.userService.createUser({
        name,
        accessibility,
        price,
      });

      res.json(user);
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  };

  readById: Middleware = async (req, res) => {
    const { id } = req.params;
    const userId: number = parseInt(id, 10);

    if (!id || !userId) {
      return res.status(400).json({
        status: "error",
        message: "id is required.",
      });
    }

    try {
      const user = await this.userService.getUserById(userId);

      if (user == null) {
        return res.status(404).json({
          status: "error",
          message: `User with id ${userId} not found.`,
        });
      }

      res.json(user);
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  };
}

export default UserController;
