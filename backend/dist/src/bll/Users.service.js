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
let UsersService = class UsersService {
    constructor(users) {
        this.users = users;
        this.getUserByEmail = async (email) => {
            const user = await this.users.getById(email, "email");
            return user ? Object.assign({}, user) : null;
        };
        this.createAUser = async (user) => {
            user.id = (await this.users.getAll()).length + 1;
            return this.users.create(user);
        };
        this.initializeNewsPosts();
    }
    async initializeNewsPosts() {
        try {
            this.users = await FileDB_1.default.getTable('users');
            console.log(this.users);
        }
        catch (error) {
            console.log(error);
        }
    }
};
UsersService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [FileDB_1.default])
], UsersService);
exports.default = UsersService;
