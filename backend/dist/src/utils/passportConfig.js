"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const typedi_1 = __importDefault(require("typedi"));
const Users_service_1 = __importDefault(require("../bll/Users.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function init() {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
    }, async (email, password, done) => {
        const userService = typedi_1.default.get(Users_service_1.default);
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return done({
                errors: { "email or password": "is invalid" },
            }, false);
        }
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            return done({
                errors: { "email or password": "is invalid" },
            }, false);
        }
        return done(null, user);
    }));
}
exports.default = init;
