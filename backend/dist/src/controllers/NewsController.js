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
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const NewsPosts_service_1 = __importDefault(require("../bll/NewsPosts.service"));
const pageOptionsMiddleware_1 = __importDefault(require("../middleware/pageOptionsMiddleware"));
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const newsPostsSchema_1 = __importDefault(require("../models/newsPostsSchema"));
const customError_1 = require("../utils/customError");
const passportMiddleware_1 = __importDefault(require("../middleware/passportMiddleware"));
let NewsController = class NewsController {
    constructor(newsPostsService) {
        this.newsPostsService = newsPostsService;
        this.getAllPosts = async (req, res, next) => {
            try {
                const posts = await this.newsPostsService.getAll();
                res.send(posts);
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllPostsQuery = async (req, res, next) => {
            try {
                const params = req.pageOptions;
                if (!params) {
                    throw new customError_1.ValidationError({ name: "NewspostsServiceError", message: "No params found!", httpCode: customError_1.HttpCode.NOT_FOUND });
                }
                const posts = await this.newsPostsService.getAllPostsPaged(params);
                res.send(posts);
            }
            catch (error) {
                next(error);
            }
        };
        this.getPostById = async (req, res, next) => {
            try {
                const post = await this.newsPostsService.getById(req.params.id);
                res.send(post);
            }
            catch (error) {
                next(error);
            }
        };
        this.createPost = async (req, res, next) => {
            try {
                const post = req.body;
                const isValid = this.postValidator(post);
                if (!isValid) {
                    throw new customError_1.ValidationError({ name: "ValidationError", message: this.postValidator.errors.map((e) => e.message) });
                }
                const newPost = await this.newsPostsService.create(post);
                res.send(newPost);
            }
            catch (error) {
                next(error);
            }
        };
        this.updatePost = async (req, res, next) => {
            try {
                const post = req.body;
                const isValid = this.postValidator(post);
                if (!isValid) {
                    throw new customError_1.ValidationError({ name: "ValidationError", message: this.postValidator.errors.map((e) => e.message) });
                }
                const updatedPost = await this.newsPostsService.update(req.params.id, req.body);
                res.send(updatedPost);
            }
            catch (error) {
                next(error);
            }
        };
        this.deletePost = async (req, res, next) => {
            try {
                const deletedPost = await this.newsPostsService.delete(req.params.id);
                res.send(deletedPost);
            }
            catch (error) {
                next(error);
            }
        };
        this.testError = (_req, _res, next) => {
            try {
                throw new customError_1.ValidationError({ name: 'NewspostsServiceError', message: 'Test', httpCode: customError_1.HttpCode.INTERNAL_SERVER_ERROR });
            }
            catch (error) {
                next(error);
            }
        };
        this.router = express_1.default.Router();
        this.initializeValidators();
        this.initializeRoutes();
    }
    initializeValidators() {
        const ajv = new ajv_1.default({ allErrors: true });
        (0, ajv_formats_1.default)(ajv);
        this.postValidator = ajv.compile(newsPostsSchema_1.default);
    }
    initializeRoutes() {
        this.router.get('/newsposts/error', this.testError);
        this.router.get('/newsposts', (0, pageOptionsMiddleware_1.default)(), passportMiddleware_1.default.required, this.getAllPostsQuery);
        this.router.get('/newsposts/:id', passportMiddleware_1.default.required, this.getPostById);
        this.router.post('/newsposts', passportMiddleware_1.default.required, this.createPost);
        this.router.put('/newsposts/:id', passportMiddleware_1.default.required, this.updatePost);
        this.router.delete('/newsposts/:id', passportMiddleware_1.default.required, this.deletePost);
    }
};
NewsController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [NewsPosts_service_1.default])
], NewsController);
exports.default = NewsController;
