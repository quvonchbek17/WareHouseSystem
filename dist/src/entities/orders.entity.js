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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let Orders = class Orders {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Orders.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Orders.prototype, "order_unique_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false,
    }),
    __metadata("design:type", String)
], Orders.prototype, "order_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], Orders.prototype, "ordered_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time with time zone',
        nullable: true
    }),
    __metadata("design:type", String)
], Orders.prototype, "delivered_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['accepted', 'expected', 'arrived'],
        default: 'accepted'
    }),
    __metadata("design:type", String)
], Orders.prototype, "order_status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.Users),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.Users)
], Orders.prototype, "user_id", void 0);
Orders = __decorate([
    (0, typeorm_1.Entity)()
], Orders);
exports.Orders = Orders;
