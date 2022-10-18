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
exports.UserInfo = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UserInfo = class UserInfo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], UserInfo.prototype, "user_info_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
        nullable: false,
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "user_phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 256,
        nullable: false,
    }),
    __metadata("design:type", String)
], UserInfo.prototype, "user_full_name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.Users),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.Users)
], UserInfo.prototype, "user", void 0);
UserInfo = __decorate([
    (0, typeorm_1.Entity)()
], UserInfo);
exports.UserInfo = UserInfo;
