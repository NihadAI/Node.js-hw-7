"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FileDB_1;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const typedi_1 = require("typedi");
let FileDB = FileDB_1 = class FileDB {
    constructor(schemaName) {
        this.schemaName = schemaName;
    }
    static async readDatabase() {
        try {
            const data = await fs_1.default.promises.readFile(path_1.default.join(__dirname, 'db.json'), 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    static async saveToFile(data) {
        try {
            await fs_1.default.promises.writeFile(path_1.default.join(__dirname, 'db.json'), JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.log(error);
        }
    }
    static registerSchema(schemaName, schema) {
        this.schemas[schemaName] = schema;
    }
    static async getTable(schemaName) {
        const schema = this.schemas[schemaName];
        if (!schema) {
            throw new Error(`Schema: '${schemaName}' is not registered!`);
        }
        return new FileDB_1(schemaName);
    }
    async getAll() {
        try {
            const database = await FileDB_1.readDatabase();
            return database;
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const database = await FileDB_1.readDatabase();
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
    async create(field) {
        try {
            if (!field.title || !field.text) {
                throw new Error("Title and text required");
            }
            const database = await FileDB_1.readDatabase();
            const newRecord = Object.assign({ id: (0, uuid_1.v4)(), createdAt: new Date() }, field);
            database.push(newRecord);
            await FileDB_1.saveToFile(database);
            return newRecord;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updatedFields) {
        try {
            const database = await FileDB_1.readDatabase();
            const recordToUpdateIndex = database.findIndex((item) => item.id === id);
            const recordToUpdate = database[recordToUpdateIndex];
            const updatedRecord = Object.assign(Object.assign({}, recordToUpdate), updatedFields);
            database[recordToUpdateIndex] = updatedRecord;
            await FileDB_1.saveToFile(database);
            return database[recordToUpdateIndex];
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const database = await FileDB_1.readDatabase();
            const index = database.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error("Post not found");
            }
            const deletedPost = database.splice(index, 1)[0];
            await FileDB_1.saveToFile(database);
            return deletedPost;
        }
        catch (error) {
            throw error;
        }
    }
};
FileDB.schemas = {};
FileDB = FileDB_1 = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [String])
], FileDB);
exports.default = FileDB;
