import { Router } from "express";
import Container from "typedi";

import AppController from "@controllers/app.controller";
import ActivityController from "@controllers/activity.controller";
import UserController from "@controllers/user.controller";

export const router = Router();

// Controllers
const appCtrl = Container.get(AppController);
const activityCtrl = Container.get(ActivityController);
const userCtrl = Container.get(UserController);

router.get("/", appCtrl.index);

router.get("/activity", activityCtrl.get);

router.post("/user", userCtrl.create);
router.get("/user/:id", userCtrl.readById);
