<<<<<<< HEAD
import { Router } from 'express'
import userController from '../controllers/user.controller'
import orderController from '../controllers/order.controller'
=======
import { Router } from "express";
import userController from "../controllers/user.controller";
import userInfoController from "../controllers/user_info.controller";
>>>>>>> 99bc85cc1ea3b544cb40207d4afe8d4797e22d39

const router = Router();

router
  .get("/users", userController.GET)
  .get("/filteredUsers/:filteredStatus", userController.GET_FILTERED)
  .post("/users", userController.POST)
<<<<<<< HEAD
  .get('/orders', orderController.GET)
  .get('/orders_expected', orderController.GET_EX)
  .post('/addOrder', orderController.POST)
  .put('/updateStatus', orderController.PUT_STATUS)
=======
  .post("/userInfo", userInfoController.POST)
  .put("/userInfo/:userInfoId", userInfoController.PUT)
  .get("/userInfo/:userId", userInfoController.GET);
>>>>>>> 99bc85cc1ea3b544cb40207d4afe8d4797e22d39

export default router;