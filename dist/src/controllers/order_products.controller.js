"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../config/ormconfig");
const order_products_entity_1 = require("../entities/order_products.entity");
exports.default = {
    GET: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const orederProduct = yield ormconfig_1.dataSource.getRepository(order_products_entity_1.order_products).find();
        res.json(orederProduct);
    }),
    POST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { price, amount, count } = req.body;
        const newOrderProduct = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(order_products_entity_1.order_products)
            .values({
            product_price: price,
            product_amount: amount,
            product_count: count,
        })
            .execute();
        res.json(newOrderProduct);
    }),
    PUT: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { price, amount, count } = req.body;
        const updatedOrderProduct = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .update(order_products_entity_1.order_products)
            .set({
            product_price: price,
            product_amount: amount,
            product_count: count,
        })
            .where("order_product_id = :id", { id })
            .returning(["product_price"])
            .execute();
        res.json(updatedOrderProduct);
    }),
    DELETE: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedOrderProduct = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .delete()
            .from(order_products_entity_1.order_products)
            .where("order_product_id = :id", { id })
            .execute();
        res.json(updatedOrderProduct);
    }),
};
