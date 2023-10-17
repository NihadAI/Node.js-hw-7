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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const FileDB_1 = __importDefault(require("../dal/FileDB"));
let NewsPostsService = class NewsPostsService {
    constructor(filedDB) {
        this.filedDB = filedDB;
        this.getAll = () => {
            return this.filedDB.getAll();
        };
        this.getById = (id) => {
            return this.filedDB.getById(id);
        };
        this.create = (field) => {
            return this.filedDB.create(field);
        };
        this.update = (id, updatedFields) => {
            return this.filedDB.update(id, updatedFields);
        };
        this.delete = (id) => {
            return this.filedDB.delete(id);
        };
    }
};
NewsPostsService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [FileDB_1.default])
], NewsPostsService);
exports.default = NewsPostsService;
