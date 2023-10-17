"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const FileDB_1 = __importDefault(require("./FileDB"));
class FileDBTable {
    constructor(schemaName) {
        this.schemaName = schemaName;
    }
    async getAll() {
        try {
            const database = await FileDB_1.default.readDatabase();
            return database;
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const database = await FileDB_1.default.readDatabase();
            const post = database.find((item) => item.id === id);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    async create(record) {
        try {
            const database = await FileDB_1.default.readDatabase();
            const newRecord = Object.assign({ id: (0, uuid_1.v4)(), createdAt: new Date() }, record);
            database.push(newRecord);
            await FileDB_1.default.saveToFile(database);
            return newRecord;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updatedFields) {
        try {
            const database = await FileDB_1.default.readDatabase();
            const recordToUpdateIndex = database.findIndex((item) => item.id === id);
            const recordToUpdate = database[recordToUpdateIndex];
            const updatedRecord = Object.assign(Object.assign({}, recordToUpdate), updatedFields);
            database[recordToUpdateIndex] = updatedRecord;
            await FileDB_1.default.saveToFile(database);
            return database[recordToUpdateIndex];
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const database = await FileDB_1.default.readDatabase();
            const index = database.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error("Post not found");
            }
            const deletedPost = database.splice(index, 1)[0];
            await FileDB_1.default.saveToFile(database);
            return deletedPost;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = FileDBTable;
