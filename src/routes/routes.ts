import { Router } from "express";
import userController from "../controllers/user.controller";
import orderProduct from "../controllers/order_products.controller";

const router = Router();

router
  .get("/users", userController.GET)
  .post("/users", userController.POST)
  .post("/users", userController.POST)
  .post("/users", userController.POST)
  .get("/orderProduct", orderProduct.GET)
  .post("/orderProduct", orderProduct.POST)
  .delete("/orderProduct/:id", orderProduct.DELETE)
  .put("/orderProduct/:id", orderProduct.PUT);

export default router;
