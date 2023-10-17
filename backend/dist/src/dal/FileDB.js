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
const typedi_1 = require("typedi");
let FileDB = FileDB_1 = class FileDB {
    constructor(schemaName) {
        this.schemaName = schemaName;
        this.filePath = path_1.default.join(__dirname, `${schemaName}.json`);
    }
    async readDatabase() {
        try {
            const data = await fs_1.default.promises.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    async saveToFile(data) {
        try {
            await fs_1.default.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.log(error);
        }
    }
    static async registerSchema(schemaName, schema) {
        this.schemas[schemaName] = schema;
        return schemaName;
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
            const database = await this.readDatabase();
            return database;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllPostsPaged({ page, size }) {
        try {
            const database = await this.readDatabase();
            const results = database.slice(page * size, (page + 1) * size);
            return {
                pageOptions: { page, size },
                total: database.length,
                results,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getById(item, field) {
        try {
            const database = await this.readDatabase();
            const data = database.find((data) => data[field] === item);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async create(newItem) {
        try {
            const database = await this.readDatabase();
            database.push(newItem);
            await this.saveToFile(database);
            return newItem;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updatedFields) {
        try {
            const database = await this.readDatabase();
            const index = database.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error("Post not found");
            }
            const updatedItem = Object.assign(Object.assign({}, database[index]), updatedFields);
            database[index] = updatedItem;
            await this.saveToFile(database);
            return updatedItem;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const database = await this.readDatabase();
            const index = database.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error("Post not found");
            }
            const deletedItem = database.splice(index, 1)[0];
            await this.saveToFile(database);
            return deletedItem;
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
