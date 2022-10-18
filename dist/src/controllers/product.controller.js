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
const products_entity_1 = require("../entities/products.entity");
exports.default = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield ormconfig_1.dataSource.getRepository(products_entity_1.Products).find();
            res.json(products);
        }
        catch (err) {
            throw err;
        }
    }),
    POST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { product_name, product_price, product_count, product_potential_count, product_amount, } = req.body;
            const newProduct = yield ormconfig_1.dataSource
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
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
        }
        catch (err) {
            throw err;
        }
    }),
    PUT: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { product_name, product_price, product_count, product_potential_count, product_amount, } = req.body;
            const updateProduct = yield ormconfig_1.dataSource
                .createQueryBuilder()
                .update(products_entity_1.Products)
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
        }
        catch (err) {
            throw err;
        }
    }),
};
