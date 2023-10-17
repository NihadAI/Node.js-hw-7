"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileDB_1 = __importDefault(require("../dal/FileDB"));
const usersSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        email: { type: 'string', format: "email" },
        password: { type: 'string', minLength: 1 },
    },
    additionalProperties: true,
    required: ['email', 'password',],
};
FileDB_1.default.registerSchema('users', usersSchema);
exports.default = usersSchema;
