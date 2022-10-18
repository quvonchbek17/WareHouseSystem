"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_info_controller_1 = __importDefault(require("../controllers/user_info.controller"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const order_products_controller_1 = __importDefault(require("../controllers/order_products.controller"));
const router = (0, express_1.Router)();
router
    .get("/users", user_controller_1.default.GET)
    .get("/filteredUsers/:filteredStatus", user_controller_1.default.GET_FILTERED)
    .get("/products", product_controller_1.default.GET)
    .post("/products", product_controller_1.default.POST)
    .put("/products/:id", product_controller_1.default.PUT)
    .post("/users", user_controller_1.default.POST)
    .get("/orders", order_controller_1.default.GET)
    .get("/orders_expected", order_controller_1.default.GET_EX)
    .post("/addOrder", order_controller_1.default.POST)
    .put("/updateStatus", order_controller_1.default.PUT_STATUS)
    .post("/userInfo", user_info_controller_1.default.POST)
    .put("/userInfo/:userInfoId", user_info_controller_1.default.PUT)
    .get("/userInfo/:userId", user_info_controller_1.default.GET)
    .get("/orderProduct", order_products_controller_1.default.GET)
    .post("/orderProduct", order_products_controller_1.default.POST)
    .delete("/orderProduct/:id", order_products_controller_1.default.DELETE)
    .put("/orderProduct/:id", order_products_controller_1.default.PUT);
exports.default = router;
