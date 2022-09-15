import { Router } from "express";
import userController from "../controllers/user.controller";
import productsController from "../controllers/product.controller";

const router = Router();

router
  .get("/users", userController.GET)
  .get("/filteredUsers/:filteredStatus", userController.GET_FILTERED)
  .get("/products", productsController.GET)
  .post("/products", productsController.POST)
  .put("/products/:id", productsController.PUT)
  .post("/users", userController.POST)
  .post("/users", userController.POST)
  .post("/users", userController.POST);

export default router;
