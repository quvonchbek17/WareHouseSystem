import { Router } from "express";
import orderController from "../controllers/order.controller";
import userController from "../controllers/user.controller";
import userInfoController from "../controllers/user_info.controller";
import productsController from "../controllers/product.controller";
import orderProduct from "../controllers/order_products.controller";

const router = Router();

router
  .get("/users", userController.GET)
  .get("/filteredUsers/:filteredStatus", userController.GET_FILTERED)
  .get("/products", productsController.GET)
  .post("/products", productsController.POST)
  .put("/products/:id", productsController.PUT)
  .post("/users", userController.POST)
  .get("/orders", orderController.GET)
  .get("/orders_expected", orderController.GET_EX)
  .post("/addOrder", orderController.POST)
  .put("/updateStatus", orderController.PUT_STATUS)
  .post("/userInfo", userInfoController.POST)
  .put("/userInfo/:userInfoId", userInfoController.PUT)
  .get("/userInfo/:userId", userInfoController.GET)
  .get("/orderProduct", orderProduct.GET)
  .post("/orderProduct", orderProduct.POST)
  .delete("/orderProduct/:id", orderProduct.DELETE)
  .put("/orderProduct/:id", orderProduct.PUT);

export default router;
