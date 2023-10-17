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
const uuid_1 = require("uuid");
let NewsPostsService = class NewsPostsService {
    constructor(newsPosts) {
        this.newsPosts = newsPosts;
        this.getAll = () => {
            return this.newsPosts.getAll();
        };
        this.getAllPostsPaged = (params) => {
            return this.newsPosts.getAllPostsPaged(params);
        };
        this.getById = async (id) => {
            const post = await this.newsPosts.getById(id, "id");
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        };
        this.create = (field) => {
            const id = (0, uuid_1.v4)();
            const createdAt = new Date().toISOString();
            const post = Object.assign({ id,
                createdAt }, field);
            return this.newsPosts.create(post);
        };
        this.update = async (id, updatedFields) => {
            const updatedPost = await this.newsPosts.update(id, updatedFields);
            if (!updatedPost) {
                throw new Error("Post not found");
            }
            return updatedPost;
        };
        this.delete = async (id) => {
            const deletedPost = await this.newsPosts.delete(id);
            if (!deletedPost) {
                throw new Error("Post not found");
            }
            return deletedPost;
        };
        this.initializeNewsPosts();
    }
    async initializeNewsPosts() {
        try {
            this.newsPosts = await FileDB_1.default.getTable('newsposts');
            console.log(this.newsPosts);
        }
        catch (error) {
            console.log(error);
        }
    }
};
NewsPostsService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [FileDB_1.default])
], NewsPostsService);
exports.default = NewsPostsService;
