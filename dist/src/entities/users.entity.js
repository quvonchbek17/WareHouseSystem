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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const user_info_entity_1 = require("./user_info.entity");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 32,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Users.prototype, "user_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], Users.prototype, "user_created_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_info_entity_1.UserInfo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_info_entity_1.UserInfo)
], Users.prototype, "user_info", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
