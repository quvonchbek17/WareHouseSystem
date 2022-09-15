import {Request, Response } from "express"
import { dataSource } from '../config/ormconfig'
import { UserInfo } from '../entities/user_info.entity'
import { Users } from '../entities/users.entity'

export default {
    GET: async(req: Request, res: Response) => {
        try {
            const { userId } = req.params
            const userInfo = await dataSource.getRepository(UserInfo).find({
                relations: {
                    user: true
                },
                where: {
                    user: {
                        user_id: userId
                    }
                }
            })

            res.json(userInfo)
        } catch (error) {
            console.log(error);
        }
    },
    POST: async(req: Request, res: Response) => {
        const { phone, fullname, userId } = req.body

        const newUser = await dataSource
            .createQueryBuilder()
            .insert()
            .into(UserInfo)
            .values({ user_phone_number: phone, user_full_name: fullname, user: userId })
            .returning(["user_full_name"])
            .execute()

        res.json(newUser)
    },
    PUT: async(req: Request, res: Response) => {
        const { userInfoId } = req.params
        const { phone, fullname } = req.body

        const updatedUserInfo = await dataSource
            .createQueryBuilder()
            .update(UserInfo)
            .set({ user_phone_number: phone, user_full_name: fullname })
            .where('user_info_id = :id', { id: userInfoId })
            .returning(["user_phone_number", "user_full_name"])
            .execute()

        res.json(updatedUserInfo)
    },
}