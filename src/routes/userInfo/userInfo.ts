import { Router } from "express"

import userInfoController from "../../controllers/user_info.controller"

const userInfoRouter = Router()

export default userInfoRouter
	.get("/userInfo/:id", userInfoController.GET)
	.post("/userInfo", userInfoController.POST)
	.put("/userInfo/:id", userInfoController.PUT)