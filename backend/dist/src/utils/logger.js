"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequest = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// Init transports
const consoleTransport = new winston_1.default.transports.Console();
const errorTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxSize: '1m',
    maxFiles: '7d',
});
const applicationTransport = new winston_daily_rotate_file_1.default({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1m',
    maxFiles: '7d',
});
// Formatter
const { combine, timestamp, label, printf } = winston_1.default.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${typeof message === 'object' ? JSON.stringify(message) : message}`;
});
const myWinstonOptions = {
    format: combine(timestamp(), myFormat),
    transports: [consoleTransport, applicationTransport, errorTransport],
};
const logger = winston_1.default.createLogger(myWinstonOptions);
function logRequest(req, _res, next) {
    let logMessage = `Method: ${req.method}, URL: ${req.url}`;
    if (Object.keys(req.body).length > 0) {
        logMessage += `, Body: ${JSON.stringify(req.body)}`;
    }
    logger.info(logMessage);
    next();
}
exports.logRequest = logRequest;
exports.default = logger;
