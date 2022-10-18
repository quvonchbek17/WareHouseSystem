import { Router } from "express"

import ordersController from "../../controllers/order.controller"

const orderRouter = Router()

export default orderRouter
	.get("/orders", ordersController.GET)
	.get("/orders_expected", ordersController.GET_EX)
	.post("/addOrder", ordersController.POST)
	.put("/updateOrderStatus/:id", ordersController.PUT_STATUS)