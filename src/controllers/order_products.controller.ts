import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { order_products } from "../entities/order_products.entity";

export default {
  GET: async (_: Request, res: Response) => {
    const orederProduct = await dataSource.getRepository(order_products).find();

    res.json(orederProduct);
  },

  POST: async (req: Request, res: Response) => {
    const { price, amount, count } = req.body;

    const newOrderProduct = await dataSource
      .createQueryBuilder()
      .insert()
      .into(order_products)
      .values({
        product_price: price,
        product_amount: amount,
        product_count: count,
      })
      .execute();

    res.json(newOrderProduct);
  },

  PUT: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { price, amount, count } = req.body;

    const updatedOrderProduct = await dataSource
      .createQueryBuilder()
      .update(order_products)
      .set({
        product_price: price,
        product_amount: amount,
        product_count: count,
      })
      .where("order_product_id = :id", { id })
      .returning(["product_price"])
      .execute();

    res.json(updatedOrderProduct);
  },

  DELETE: async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedOrderProduct = await dataSource
      .createQueryBuilder()
      .delete()
      .from(order_products)
      .where("order_product_id = :id", { id })
      .execute();

    res.json(updatedOrderProduct);
  },
};
