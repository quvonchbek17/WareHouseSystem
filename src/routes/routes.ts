
import { Router } from 'express'
import orderController from '../controllers/order.controller'
import userController from "../controllers/user.controller";
import userInfoController from "../controllers/user_info.controller";
import productsController from "../controllers/product.controller";


const router = Router();

router
  .get("/users", userController.GET)
  .get("/filteredUsers/:filteredStatus", userController.GET_FILTERED)
  .get("/products", productsController.GET)
  .post("/products", productsController.POST)
  .put("/products/:id", productsController.PUT)
  .post("/users", userController.POST)
  .get('/orders', orderController.GET)
  .get('/orders_expected', orderController.GET_EX)
  .post('/addOrder', orderController.POST)
  .put('/updateStatus', orderController.PUT_STATUS)
  .post("/userInfo", userInfoController.POST)
  .put("/userInfo/:userInfoId", userInfoController.PUT)
  .get("/userInfo/:userId", userInfoController.GET);

export default router;