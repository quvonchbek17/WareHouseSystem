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
const orders_entity_1 = require("../entities/orders.entity");
exports.default = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield ormconfig_1.dataSource
            .getRepository(orders_entity_1.Orders).find();
        res.json(orders);
    }),
    POST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { order_unique_number, order_description } = req.body;
        const newUser = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(orders_entity_1.Orders)
            .values({ order_unique_number, order_description, order_status: 'expected' })
            .returning(["user_name"])
            .execute();
        res.json(newUser === null || newUser === void 0 ? void 0 : newUser.raw);
    }),
    GET_EX: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const orders_expected = yield ormconfig_1.dataSource
            .getRepository(orders_entity_1.Orders)
            .find({
            where: {
                order_status: 'expected'
            }
        });
        res.json(orders_expected);
    }),
    PUT_STATUS: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { order_id, status, user_id } = req.body;
        const orders = yield ormconfig_1.dataSource.getRepository(orders_entity_1.Orders).find({ where: { order_id: order_id } });
        if (status == 'accepted' && user_id && orders[0].order_status !== 'arrived') {
            const updatedStatus = yield ormconfig_1.dataSource
                .createQueryBuilder()
                .update(orders_entity_1.Orders)
                .set({ order_status: status, user_id: user_id })
                .where('order_id = :order_id', { order_id })
                .returning(["order_id"])
                .execute();
            return res.json(updatedStatus.raw);
        }
        if (status == 'arrived') {
            const updatedStatus = yield ormconfig_1.dataSource
                .createQueryBuilder()
                .update(orders_entity_1.Orders)
                .set({ order_status: status, delivered_at: () => 'CURRENT_TIMESTAMP', user_id: null })
                .where('order_id = :order_id', { order_id })
                .returning(["order_id"])
                .execute();
            return res.json(updatedStatus.raw);
        }
        res.send('Bad request');
    })
};
