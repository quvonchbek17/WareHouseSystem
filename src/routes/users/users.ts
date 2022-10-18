import { Router } from "express"

import userController from "../../controllers/user.controller"

const userRouter = Router()

export default userRouter
	.get("/users", userController.GET)
	.get("/filteredUsers/:filteredStatus", userController.GET_FILTERED)
	.post("/newUser", userController.POST)
	.put("/userUpdate/:id", userController.PUT)