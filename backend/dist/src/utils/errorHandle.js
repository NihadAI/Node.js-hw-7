"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./customError");
const logger_1 = __importDefault(require("./logger"));
const sentry_1 = __importDefault(require("./sentry"));
const errorHandle = (err, _req, res, _next) => {
    if (process.env.NODE_ENV === 'production') {
        if (err instanceof customError_1.AppError) {
            (0, sentry_1.default)(err);
            logger_1.default.warn(`${err}`);
            return res.status(err.httpCode).json({ name: err.name, message: err.message });
        }
        else {
            (0, sentry_1.default)(err);
            logger_1.default.error(`Message: ${err.message}`);
            res.status(500).json({ name: err.name, message: err.message });
        }
    }
    else {
        if (err instanceof customError_1.AppError) {
            (0, sentry_1.default)(err);
            logger_1.default.warn(`${err}`);
            return res.status(err.httpCode).json({ name: err.name, message: err.message });
        }
        else {
            (0, sentry_1.default)(err);
            logger_1.default.error(`Message: ${err.message}, Stack: ${err.stack}`);
            res.status(500).json({ name: err.name, message: err.message, stack: err.stack });
        }
    }
};
exports.default = errorHandle;
