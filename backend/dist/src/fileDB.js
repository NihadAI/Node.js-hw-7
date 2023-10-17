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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FileDBTable_1 = __importDefault(require("./FileDBTable"));
class FileDB {
    static readDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.default.promises.readFile(path_1.default.join(__dirname, 'db.json'), 'utf-8');
                return JSON.parse(data);
            }
            catch (error) {
                return [];
            }
        });
    }
    static saveToFile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default.promises.writeFile(path_1.default.join(__dirname, 'db.json'), JSON.stringify(data, null, 2), 'utf-8');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static registerSchema(schemaName, schema) {
        this.schemas[schemaName] = schema;
    }
    static getTable(schemaName) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = this.schemas[schemaName];
            if (!schema) {
                throw new Error(`Schema: '${schemaName}' is not registered!`);
            }
            return new FileDBTable_1.default(schemaName);
        });
    }
}
FileDB.schemas = {};
exports.default = FileDB;
