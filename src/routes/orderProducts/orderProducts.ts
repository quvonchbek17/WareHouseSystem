import { Router } from "express"

import orderProductController from "../../controllers/order_products.controller"

const ordersProductRouter = Router()

export default ordersProductRouter
	.post("/orderProduct", orderProductController.POST)
	.put("/orderProduct/:id", orderProductController.PUT)
	.delete("/orderProduct/:id", orderProductController.DELETE)
