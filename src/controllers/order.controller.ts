import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Orders } from "../entities/orders.entity";
import { CustomErrorHandler } from "../errors/errorHandler";
import {
	OrderPostValidation,
	OrderPutValidation,
} from "../utils/validation/order.validation";
import { ParamFilter } from "../utils/validation/user.validation";

export default {
	GET: async (_: Request, res: Response, next: NextFunction) => {
		const orders = await dataSource
			.getRepository(Orders)
			.find({
				relations: {
					user: true,
					order_products: {
						product: true
					}
				},
			})
			.catch((err) => next(new CustomErrorHandler(err.message, 503)));

		if(orders) res.json(orders);
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = OrderPostValidation.validate(req.body);

		if (error) {
			return next(new CustomErrorHandler(error.message, 400));
		}

		const { description } = value;

		const newOrder = await dataSource
			.createQueryBuilder()
			.insert()
			.into(Orders)
			.values({ order_description: description, order_status: "expected" })
			.returning(["order_id"])
			.execute()
			.catch((err) => new CustomErrorHandler(err.message, 503));

		res.json(newOrder);
	},
	GET_EX: async (_: Request, res: Response, next: NextFunction) => {
		const orders_expected = await dataSource
			.getRepository(Orders)
			.find({
				where: {
					order_status: "expected",
				},
			})
			.catch((err) => next(new CustomErrorHandler(err.message, 503)));

		res.json(orders_expected);
	},
	PUT_STATUS: async (req: Request, res: Response, next: NextFunction) => {
		const { error: paramError, value: paramValue } = ParamFilter.validate(
			req.params
		);

		if (paramError) {
			return next(new CustomErrorHandler(paramError.message, 400));
		}

		const { id } = paramValue;

		const { error, value } = OrderPutValidation.validate(req.body);

		if (error) {
			return next(new CustomErrorHandler(error.message, 400));
		}

		const { status, userId, description } = value;

		const orders = await dataSource
			.getRepository(Orders)
			.find({ where: { order_id: id } });

		if (!orders.length) {
			return next(
				new CustomErrorHandler("Order with this id is not found", 404)
			);
		}

		if (
			status == "accepted" &&
			userId &&
			orders[0].order_status !== "arrived"
		) {
			const updatedStatus = await dataSource
				.createQueryBuilder()
				.update(Orders)
				.set({
					order_status: status,
					user: userId,
					order_description: description,
				})
				.where("order_id = :order_id", { order_id: id })
				.returning(["order_id"])
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)));

			return res.json(updatedStatus);
		}

		if (status == "arrived") {
			const updatedStatus = await dataSource
				.createQueryBuilder()
				.update(Orders)
				.set({
					order_status: status,
					delivered_at: () => "CURRENT_TIMESTAMP",
					user: userId,
				})
				.where("order_id = :order_id", { id })
				.returning(["order_id"])
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)));

			return res.json(updatedStatus);
		}
	},
};
