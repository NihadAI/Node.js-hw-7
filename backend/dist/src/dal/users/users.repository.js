"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
let UsersRepository = class UsersRepository {
    constructor() {
        this.users = [];
    }
    async getByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user ? Object.assign({}, user) : null;
    }
    ;
    async createAUser(user) {
        user.id = this.users.length + 1;
        this.users.push(Object.assign({}, user));
        return user;
    }
    ;
};
UsersRepository = __decorate([
    (0, typedi_1.Service)()
], UsersRepository);
exports.default = UsersRepository;
