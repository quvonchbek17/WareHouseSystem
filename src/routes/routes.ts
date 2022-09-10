import { Router } from 'express'
import userController from '../controllers/user.controller'

const router = Router()

router
    .get('/users', userController.GET)
    .post('/users', userController.POST)
    .post('/users', userController.POST)
    .post('/users', userController.POST)

export default router