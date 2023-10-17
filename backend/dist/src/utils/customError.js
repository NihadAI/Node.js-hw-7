"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.AppError = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
class AppError extends Error {
    constructor(args) {
        super(args.message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name || "Error";
        this.httpCode = args.httpCode || HttpCode.INTERNAL_SERVER_ERROR;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(args) {
        super(Object.assign(Object.assign({}, args), { httpCode: args.httpCode || HttpCode.BAD_REQUEST }));
    }
}
exports.ValidationError = ValidationError;
