import { NextFunction, Request, Response } from "express"
import { dataSource } from '../config/ormconfig'
import { UserInfo } from '../entities/user_info.entity'
import { CustomErrorHandler } from "../errors/errorHandler"
import { uuidCheck } from "../regexp/regexp"
import { UserInfoPostFilter, UserInfoPutFilter, ParamFilter } from "../utils/validation/user.validation"

export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {
        try {
			const { error, value } = ParamFilter.validate(req.params)

			if(error) {
				return next(new CustomErrorHandler(error.message, 400))
			}

            const { id } = value

            const userInfo = await dataSource.getRepository(UserInfo).find({
                relations: {
                    user: true
                },
                where: {
                    user: {
                        user_id: id
                    }
                }
            })
			.catch(err => next(new CustomErrorHandler(err.message, 503)))

            res.json(userInfo)
        } catch (error) {
            console.log(error);
        }
    },
    POST: async(req: Request, res: Response, next: NextFunction) => {
		const { error, value } = UserInfoPostFilter.validate(req.body)

		if(error) {
			return next(new CustomErrorHandler(error.message, 400))
		}
		
        const { phone, fullname, userId } = value

        const newUser = await dataSource
            .createQueryBuilder()
            .insert()
            .into(UserInfo)
            .values({ user_phone_number: phone, user_full_name: fullname, user: userId })
            .returning(["user_full_name"])
            .execute()
			.catch(err => next(new CustomErrorHandler(err?.message, 503)))

        res.json(newUser)
    },
    PUT: async(req: Request, res: Response, next: NextFunction) => {
		const { error, value } = ParamFilter.validate(req.params)

		if(error) {
			return next(new CustomErrorHandler(error.message, 400))
		}

        const { id } = value

		const { error: putError, value: putValue  } = UserInfoPutFilter.validate(req.body)

		if(putError) {
			return next(new CustomErrorHandler(putError.message, 400))
		}

        const { phone, fullname } = putValue

		console.log(phone, fullname, id)

        const updatedUserInfo = await dataSource
            .createQueryBuilder()
            .update(UserInfo)
            .set({ user_phone_number: phone, user_full_name: fullname })
            .where('user_info_id = :id', { id })
            .returning(["user_phone_number", "user_full_name"])
            .execute()
			.catch(err => next(new CustomErrorHandler(err.message, 503)))

        res.json(updatedUserInfo)
    }
}