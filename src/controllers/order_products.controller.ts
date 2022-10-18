import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { order_products } from "../entities/order_products.entity"
import { CustomErrorHandler } from "../errors/errorHandler"
import { OrderProductsPostValidation, OrderProductsPutValidation } from "../utils/validation/order.validation"
import { ParamFilter } from "../utils/validation/user.validation"

export default {
	POST: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = OrderProductsPostValidation.validate(req.body)

		if(error) {
			return next(new CustomErrorHandler(error.message, 400))
		}

		const { orderProducts } = value

		const newOrderProduct = await dataSource
			.createQueryBuilder()
			.insert()
			.into(order_products)
			.values(orderProducts)
			.returning(["order_product_id"])
			.execute()
			.catch(err => next(new CustomErrorHandler(err.message, 503)))

		if(newOrderProduct) res.status(201).json({
			message: "Order products has been added"
		})
	},
	PUT: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = ParamFilter.validate(req.params)

		const { id } = value

		if(error) {
			return next(new CustomErrorHandler(error.message, 400))
		}

		const { error: bodyError, value: bodyValue } = OrderProductsPutValidation.validate(req.body)

		if(bodyError) {
			return next(new CustomErrorHandler(bodyError.message, 400))
		}

		const { count } = bodyValue

		const updatedOrderProduct = await dataSource
			.createQueryBuilder()
			.update(order_products)
			.set({
				product_count: count
			})
			.where("order_product_id = :id", { id })
			.returning(["order_product_id"])
			.execute()
			.catch(err => next(new CustomErrorHandler(err.message, 503)))

		if(updatedOrderProduct) res.json(updatedOrderProduct)
	},
	DELETE: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = ParamFilter.validate(req.params)

		if(error) return next(new CustomErrorHandler(error.message, 400))

		const { id } = value

		const deletedOrderProduct = await dataSource
			.createQueryBuilder()
			.delete()
			.from(order_products)
			.where("order_product_id = :id", { id })
			.returning(["order_product_id"])
			.execute()
			.catch(err => next(new CustomErrorHandler(err.message, 503)))

		if(deletedOrderProduct) res.json(deletedOrderProduct)
	}
}
