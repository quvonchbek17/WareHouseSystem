import { NextFunction, Request, Response } from "express"
import { dataSource } from "../config/ormconfig"
import { Products } from "../entities/products.entity"
import { CustomErrorHandler } from "../errors/errorHandler"
import {
	productPostValidation,
	productPutValidation,
} from "../utils/validation/products.validation"
import { ParamFilter } from "../utils/validation/user.validation"

export default {
	GET: async (_: Request, res: Response, next: NextFunction) => {
		const products = await dataSource
			.getRepository(Products)
			.find()
			.catch((err) => next(new CustomErrorHandler(err.message, 503)))

		res.json(products)
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = productPostValidation.validate(req.body)

		if (error) {
			return next(new CustomErrorHandler(error.message, 400))
		}

		const { name, price, count, potentialCount, amount } = value

		const newProduct = await dataSource
			.createQueryBuilder()
			.insert()
			.into(Products)
			.values({
				product_name: name,
				product_price: price,
				product_count: count,
				product_potential_count: potentialCount,
				product_amount: amount
			})
			.returning([
				"product_name",
				"product_price",
				"product_count",
				"product_potential_count",
				"product_amount",
			])
			.execute()
			.catch((err) => next(new CustomErrorHandler(err.message, 503)))

		res.json(newProduct)
	},
	PUT: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { error: paramError, value: paramValue } = ParamFilter.validate(req.params)

			if(paramError) {
				console.log(paramError)
				return next(new CustomErrorHandler(paramError.message, 400))
			}

			const { id } = paramValue

			const { error, value } = productPutValidation.validate(req.body)

			if(error) {
				return next(new CustomErrorHandler(error.message, 400))
			}

			const { name, price, count, potentialCount, amount } = value

			const updatedProduct = await dataSource
				.createQueryBuilder()
				.update(Products)
				.set({
					product_name: name,
					product_price: price,
					product_count: count,
					product_potential_count: potentialCount,
					product_amount: amount,
				})
				.where("id = :id", { id })
				.returning([
					"product_name",
					"product_price",
					"product_count",
					"product_potential_count",
					"product_amount",
				])
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)))

			res.json(updatedProduct)
		} catch (err) {
			throw err
		}
	}
}
