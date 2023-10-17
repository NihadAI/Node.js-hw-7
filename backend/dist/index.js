"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./src/App"));
const typedi_1 = __importDefault(require("typedi"));
const NewsController_1 = __importDefault(require("./src/controllers/NewsController"));
const convictConfig_1 = __importDefault(require("./src/utils/convictConfig"));
const AuthController_1 = __importDefault(require("./src/controllers/AuthController"));
const main = async () => {
    const port = convictConfig_1.default.get('PORT');
    const host = convictConfig_1.default.get('HOST');
    const app = new App_1.default([typedi_1.default.get(NewsController_1.default), typedi_1.default.get(AuthController_1.default)], port, host);
    console.log(typedi_1.default.get(NewsController_1.default));
    app.listen();
};
main().catch((error) => {
    console.error(error);
});
