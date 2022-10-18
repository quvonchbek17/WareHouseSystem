import { NextFunction, Request, Response } from "express";
import { Not } from "typeorm";
import { dataSource } from "../config/ormconfig";
import { Users } from "../entities/users.entity";
import { CustomErrorHandler } from "../errors/errorHandler";
import {
	ParamFilter,
	UserPostSchema,
	UserPutFilter,
	UserRoleFilter,
} from "../utils/validation/user.validation";

export default {
	GET: async (_: Request, res: Response, next: NextFunction) => {
		try {
			const users = await dataSource.getRepository(Users).findBy({
				user_id: Not("f381840d-5bfb-41d2-af2b-e539fbfae9e5"),
			});

			res.json(users);
		} catch (err) {
			next(new CustomErrorHandler(err.message, 503));
		}
	},
	GET_FILTERED: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = UserRoleFilter.validate(req.params);

		if (error) {
			return next(new CustomErrorHandler(error.message, 400));
		}

		const { filteredStatus } = value;

		if (filteredStatus === "storekeepers") {
			const users = await dataSource
				.getRepository(Users)
				.createQueryBuilder()
				.where("user_status = :user_status", { user_status: 2 })
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)));

			res.json(users);
		} else if (filteredStatus === "not_actives") {
			const users = await dataSource
				.getRepository(Users)
				.createQueryBuilder()
				.where("is_active = :active", { active: false })
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)));

			res.json(users);
		} else if (filteredStatus === "drivers") {
			const users = await dataSource
				.getRepository(Users)
				.createQueryBuilder()
				.where("user_status = :user_status", { user_status: 1 })
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)));

			res.json(users);
		} else if (filteredStatus === "active" || !filteredStatus) {
			const users = await dataSource
				.getRepository(Users)
				.createQueryBuilder()
				.where("is_active = :active", { active: true })
				.execute()
				.catch((err) => next(new CustomErrorHandler(err.message, 503)));

			res.json(users);
		} else {
			return next(new CustomErrorHandler("user status not found", 404));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = UserPostSchema.validate(req.body);

		const { name, password, status } = value;

		if (error) {
			return next(new CustomErrorHandler(error.message, 400));
		}

		const newUser = await dataSource
			.createQueryBuilder()
			.insert()
			.into(Users)
			.values({
				user_name: name,
				user_password: password,
				user_status: status,
			})
			.returning(["user_name"])
			.execute()
			.catch((err) => next(new CustomErrorHandler(err.message, 503)));

		res.json(newUser);
	},
	PUT: async (req: Request, res: Response, next: NextFunction) => {
		const { error: paramaError, value: paramValue } = ParamFilter.validate(
			req.params
		);

		if (paramaError) {
			return next(new CustomErrorHandler(paramaError.message, 400));
		}

		const { id } = paramValue;

		const { error, value } = UserPutFilter.validate(req.body);

		if (error) {
			return next(new CustomErrorHandler(error.message, 400));
		}

		const { name, password, status, is_active } = value;

		const updatedUser = await dataSource
			.createQueryBuilder()
			.update(Users)
			.set({
				user_name: name,
				user_password: password,
				user_status: status,
				is_active,
			})
			.where("user_id = :id", { id })
			.returning(["is_active"])
			.execute()
			.catch((err) => next(new CustomErrorHandler(err.message, 503)));

		res.json(updatedUser);
	},
};
