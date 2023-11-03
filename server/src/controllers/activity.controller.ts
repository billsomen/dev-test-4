import { ActivityDTO } from "@interfaces/activity.dto";
import { IActivity } from "@interfaces/activity.interface";
import { IUser } from "@interfaces/user.interface";
import ActivityService from "@services/activity.service";
import BoredAPIService from "@services/boredapi.service";
import UserService from "@services/user.service";
import { Service } from "typedi";
import { Middleware } from "../custom-types/express-middleware";

@Service()
class ActivityController {
  constructor(
    private readonly boredAPIService: BoredAPIService,
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
  ) {}

  get: Middleware = async (req, res) => {
    const activeUser = req.headers['active-user'];

    let userId = 0;
    let user: IUser = null;
    if (activeUser && typeof activeUser === "string")
      userId = parseInt(activeUser, 10);

    try {
      if (userId > 0) {
        user = await this.userService.getUserById(userId);
      }
      const dto: ActivityDTO = await this.boredAPIService.getActivity(user);
      const activity: IActivity = this.activityService.getActivity(dto);

      res.json(activity);
    } catch (e) {
      res.status(500).json({ status: "error", message: e.message });
    }
  };
}

export default ActivityController;
