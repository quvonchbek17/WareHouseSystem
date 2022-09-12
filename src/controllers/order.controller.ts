import { Request, Response } from 'express'
import { dataSource } from '../config/ormconfig'
import { Orders } from '../entities/orders.entity'

export default {
    GET: async(req: Request, res: Response) => {
        const orders = await dataSource
            .getRepository(Orders).find()
        res.json(orders)
    },
    POST: async(req: Request, res: Response) => {
        const { order_unique_number, order_description } = req.body

        const newUser = await dataSource
            .createQueryBuilder()
            .insert()
            .into(Orders)
            .values({ order_unique_number, order_description, order_status: 'expected' })
            .returning(["user_name"])
            .execute()

        res.json(newUser?.raw)
    },
    GET_EX: async(req: Request, res: Response) => {
        const orders_expected = await dataSource
            .getRepository(Orders)
            .find({
                where: {
                    order_status: 'expected'
                }
            })
        res.json(orders_expected)
    },
    PUT_STATUS: async(req: Request, res: Response) => {
        const { order_id, status, user_id } = req.body

        if(status == 'accepted' && user_id) {
            const updatedStatus = await dataSource
                .createQueryBuilder()
                .update(Orders)
                .set({ order_status: status, user_id: user_id })
                //arrived qilingan orderlani accesped qilinib qolivotti
                .where('order_id = :order_id', { order_id })
                .returning(["user_id"])
                .execute()
            res.json(updatedStatus.raw)
        }
        if(status == 'arrived') {
            const updatedStatus = await dataSource
                .createQueryBuilder()
                .update(Orders)
                .set({ order_status: status, delivered_at: () => 'CURRENT_TIMESTAMP' })
                .where('order_id = :order_id', { order_id })
                .returning(["order_id"])
                .execute()
            res.json(updatedStatus.raw)
            //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        }
        res.send('Bad request')
    }
}
