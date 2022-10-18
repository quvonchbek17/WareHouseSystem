import { Router } from "express"
import orderProducts from "./orderProducts/orderProducts"
import orders from "./orders/orders"
import products from "./products/products"
import userInfo from "./userInfo/userInfo"
import users from "./users/users"
const router = Router()

router
	.use([users, userInfo, orders, products, orderProducts])

export default router