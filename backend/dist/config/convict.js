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
        default: null,
    },
};
const config = (0, convict_1.default)(definitions);
config.validate({ allowed: "strict" });
exports.default = config;
