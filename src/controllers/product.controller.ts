import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Products } from "../entities/products.entity";

export default {
  GET: async (req: Request, res: Response) => {
    try {
      const products = await dataSource.getRepository(Products).find();
      res.json(products);
    } catch (err) {
      throw err;
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const {
        product_name,
        product_price,
        product_count,
        product_potential_count,
        product_amount,
      } = req.body;

      const newProduct = await dataSource
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values({
          product_name,
          product_price,
          product_count,
          product_potential_count,
          product_amount,
        })
        .returning([
          "product_name",
          "product_price",
          "product_count",
          "product_potential_count",
          "product_amount",
        ])
        .execute();

      res.json(newProduct);
    } catch (err) {
      throw err;
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        product_name,
        product_price,
        product_count,
        product_potential_count,
        product_amount,
      } = req.body;

      const updateProduct = await dataSource
        .createQueryBuilder()
        .update(Products)
        .set({
          product_name,
          product_price,
          product_count,
          product_potential_count,
          product_amount,
        })
        .where("id = :id", { id })
        .returning([
          "product_name",
          "product_price",
          "product_count",
          "product_potential_count",
          "product_amount",
        ])
        .execute();

      res.json(updateProduct);
    } catch (err) {
      throw err;
    }
  },
};
