"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_products = void 0;
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("./products.entity");
let order_products = class order_products {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], order_products.prototype, "order_product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 256,
        nullable: false,
    }),
    __metadata("design:type", String)
], order_products.prototype, "product_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 256,
        nullable: false,
    }),
    __metadata("design:type", String)
], order_products.prototype, "product_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], order_products.prototype, "product_count", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => products_entity_1.Products),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], order_products.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], order_products.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], order_products.prototype, "order_produc_joined_at", void 0);
order_products = __decorate([
    (0, typeorm_1.Entity)()
], order_products);
exports.order_products = order_products;
