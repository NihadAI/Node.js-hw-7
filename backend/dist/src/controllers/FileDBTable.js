"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const newsPosts_1 = require("../models/newsPosts");
class FileDBTable {
    constructor(schemaName) {
        this.schemaName = schemaName;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = yield newsPosts_1.FileDB.readDatabase();
                return database;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = yield newsPosts_1.FileDB.readDatabase();
                const post = database.find((item) => item.id === id);
                if (!post) {
                    throw new Error("Post not found");
                }
                return post;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(record) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = yield newsPosts_1.FileDB.readDatabase();
                const newRecord = Object.assign({ id: (0, uuid_1.v4)(), createdAt: new Date() }, record);
                database.push(newRecord);
                yield newsPosts_1.FileDB.saveToFile(database);
                return newRecord;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, updatedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = yield newsPosts_1.FileDB.readDatabase();
                const recordToUpdateIndex = database.findIndex((item) => item.id === id);
                const recordToUpdate = database[recordToUpdateIndex];
                const updatedRecord = Object.assign(Object.assign({}, recordToUpdate), updatedFields);
                database[recordToUpdateIndex] = updatedRecord;
                yield newsPosts_1.FileDB.saveToFile(database);
                return database[recordToUpdateIndex];
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = yield newsPosts_1.FileDB.readDatabase();
                const index = database.findIndex((item) => item.id === id);
                if (index === -1) {
                    throw new Error("Post not found");
                }
                const deletedPost = database.splice(index, 1)[0];
                yield newsPosts_1.FileDB.saveToFile(database);
                return deletedPost;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = FileDBTable;
