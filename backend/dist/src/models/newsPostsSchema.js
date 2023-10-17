"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileDB_1 = __importDefault(require("../dal/FileDB"));
const newsPostsSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string', maxLength: 50 },
        text: { type: 'string', maxLength: 256 },
        genre: { type: 'string', enum: ['Politic', 'Business', 'Sport', 'Other'] },
        isPrivate: { type: 'boolean' },
        createdAt: { type: 'string' },
    },
    additionalProperties: false,
    required: ['title', 'text', 'genre', 'isPrivate'],
};
FileDB_1.default.registerSchema('newsposts', newsPostsSchema);
exports.default = newsPostsSchema;
