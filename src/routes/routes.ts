import { Router } from 'express'
import userController from '../controllers/user.controller'
import orderController from '../controllers/order.controller'

const router = Router()

router
    .get('/users', userController.GET)
    .post('/users', userController.POST)
    .post('/users', userController.POST)
    .post('/users', userController.POST)
    .get('/orders', orderController.GET)
    .get('/orders_expected', orderController.GET_EX)
    .post('/addOrder', orderController.POST)
    .put('/updateStatus', orderController.PUT_STATUS)

export default router