import { Router } from "express"

import productsController from "../../controllers/product.controller"

const productsRouter = Router()

export default productsRouter
	.get("/products", productsController.GET)
	.post("/products", productsController.POST)
	.put("/products/:id", productsController.PUT)