import { Router } from "express";
import userController from "../controllers/user.controller";
import userInfoController from "../controllers/user_info.controller";

const router = Router();

router
  .get("/users", userController.GET)
  .get("/filteredUsers/:filteredStatus", userController.GET_FILTERED)
  .post("/users", userController.POST)
  .post("/userInfo", userInfoController.POST)
  .put("/userInfo/:userInfoId", userInfoController.PUT)
  .get("/userInfo/:userId", userInfoController.GET);

export default router;
