"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("./src/config/ormconfig");
const routes_1 = __importDefault(require("./src/routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
console.log("Ok");
ormconfig_1.dataSource
    .initialize()
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err));
app.listen(8080, () => {
    console.log(8080);
});
