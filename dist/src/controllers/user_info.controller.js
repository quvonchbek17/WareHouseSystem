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
const user_info_entity_1 = require("../entities/user_info.entity");
exports.default = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const userInfo = yield ormconfig_1.dataSource.getRepository(user_info_entity_1.UserInfo).find({
                relations: {
                    user: true
                },
                where: {
                    user: {
                        user_id: userId
                    }
                }
            });
            res.json(userInfo);
        }
        catch (error) {
            console.log(error);
        }
    }),
    POST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phone, fullname, userId } = req.body;
        const newUser = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .insert()
            .into(user_info_entity_1.UserInfo)
            .values({ user_phone_number: phone, user_full_name: fullname, user: userId })
            .returning(["user_full_name"])
            .execute();
        res.json(newUser);
    }),
    PUT: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userInfoId } = req.params;
        const { phone, fullname } = req.body;
        const updatedUserInfo = yield ormconfig_1.dataSource
            .createQueryBuilder()
            .update(user_info_entity_1.UserInfo)
            .set({ user_phone_number: phone, user_full_name: fullname })
            .where('user_info_id = :id', { id: userInfoId })
            .returning(["user_phone_number", "user_full_name"])
            .execute();
        res.json(updatedUserInfo);
    }),
};
