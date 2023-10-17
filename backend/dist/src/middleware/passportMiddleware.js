"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const convictConfig_1 = __importDefault(require("../utils/convictConfig"));
const customError_1 = require("../utils/customError");
const getTokenFromHeaders = (req) => {
    const { headers: { authorization }, } = req;
    if (authorization && authorization.split(" ")[0] === "Token") {
        return authorization.split(" ")[1];
    }
    return null;
};
const auth = {
    required: (req, res, next) => {
        (0, express_jwt_1.expressjwt)({
            secret: convictConfig_1.default.get('SECRET_KEY'),
            getToken: getTokenFromHeaders,
            algorithms: ['HS256'],
        })(req, res, (err) => {
            if (err) {
                next(new customError_1.ValidationError({ message: 'Unauthorized', httpCode: customError_1.HttpCode.UNAUTHORIZED }));
            }
            else {
                next(err);
            }
        });
    },
    optional: (0, express_jwt_1.expressjwt)({
        secret: convictConfig_1.default.get("SECRET_KEY"),
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
        algorithms: ["HS256"],
    }),
};
exports.default = auth;
