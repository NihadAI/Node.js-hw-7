"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convict_1 = __importDefault(require("convict"));
require("dotenv/config");
const definitions = {
    PORT: {
        env: "PORT",
        format: Number,
        default: 3000,
    },
    HOST: {
        env: "HOST",
        format: String,
        nullable: false,
        default: 'localhost',
    },
    SECRET_KEY: {
        env: "SECRET_KEY",
        format: String,
        default: 'QWE123',
    },
};
const convictConfig = (0, convict_1.default)(definitions);
convictConfig.validate({ allowed: "strict" });
exports.default = convictConfig;
