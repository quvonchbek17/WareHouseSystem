import { Request, Response } from 'express'
import { Not } from 'typeorm'
import { dataSource } from '../config/ormconfig'
import { Users } from '../entities/users.entity'

export default {
    GET: async(req: Request, res: Response) => {
        const users = await dataSource.getRepository(Users).findBy({
            user_id: Not('947f659d-7bb9-43d0-92ef-03a124978fa2')
        })

        res.json(users)
    },
    PUT: async(req: Request, res: Response) => {
        const { id } = req.params
        const { name, password, status, is_active } = req.body

        const updatedUser = await dataSource
            .createQueryBuilder()
            .update(Users)
            .set({ user_name: name, user_password: password, user_status: status, is_active })
            .where('user_id = :id', { id })
            .returning(["is_active"])
            .execute()

        res.json(updatedUser)
    },
    POST: async(req: Request, res: Response) => {
        const { name, password, status } = req.body

        const newUser = await dataSource
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values({ user_name: name, user_password: password, user_status: status })
            .returning(["user_name"])
            .execute()

        res.json(newUser)
    }
}