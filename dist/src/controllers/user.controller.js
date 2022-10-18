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
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("../config/ormconfig");
const users_entity_1 = require("../entities/users.entity");
exports.default = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield ormconfig_1.dataSource.getRepository(users_entity_1.Users).findBy({
            user_id: (0, typeorm_1.Not)("bf656ef9-f440-4aed-948e-ff2d50ca4da3"),
        });
        res.json(users);
    }),
    GET_FILTERED: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { filteredStatus } = req.params;
            if (filteredStatus === "storekeepers") {
                const users = yield ormconfig_1.dataSource
                    .getRepository(users_entity_1.Users)
                    .createQueryBuilder()
                    .where("user_status = :user_status", { user_status: 2 })
                    .execute();
                res.json(users);
            }
            else if (filteredStatus === "not_actives") {
                const users = yield ormconfig_1.dataSource
                    .getRepository(users_entity_1.Users)
                    .createQueryBuilder()
                    .where("is_active = :active", { active: false })
                    .execute();
                res.json(users);
            }
            else if (filteredStatus === "drivers") {
                const users = yield ormconfig_1.dataSource
                    .getRepository(users_entity_1.Users)
                    .createQueryBuilder()
                    .where("user_status = :user_status", { user_status: 1 })
                    .execute();
                res.json(users);
            }
            else if (filteredStatus === "active" || !filteredStatus) {
                const users = yield ormconfig_1.dataSource
                    .getRepository(users_entity_1.Users)
                    .createQueryBuilder()
                    .where("is_active = :active", { active: true })
                    .execute();
                res.json(users);
            }
            else {
                res.json({ message: "status not found" });
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    PUT: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, password, status, is_active } = req.body;
        const updatedUser = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .update(users_entity_1.Users)
            .set({
            user_name: name,
            user_password: password,
            user_status: status,
            is_active,
        })
            .where("user_id = :id", { id })
            .returning(["is_active"])
            .execute();
        res.json(updatedUser);
    }),
    POST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, password, status } = req.body;
        const newUser = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(users_entity_1.Users)
            .values({ user_name: name, user_password: password, user_status: status })
            .returning(["user_name"])
            .execute();
        res.json(newUser);
    }),
};
/*
default actives

actives ---
drivers --- 1
not_actives
storekeepers --- 2
*/
