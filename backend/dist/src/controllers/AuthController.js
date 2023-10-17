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
const Users_service_1 = __importDefault(require("../bll/Users.service"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passportMiddleware_1 = __importDefault(require("../middleware/passportMiddleware"));
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const usersSchema_1 = __importDefault(require("../models/usersSchema"));
const customError_1 = require("../utils/customError");
const convictConfig_1 = __importDefault(require("../utils/convictConfig"));
let AuthController = class AuthController {
    constructor(usersService) {
        this.usersService = usersService;
        this.privateKey = convictConfig_1.default.get('SECRET_KEY');
        this.loginPass = async (request, response, next) => {
            passport_1.default.authenticate("local", { session: false }, (err, passportUser, info) => {
                if (err) {
                    return next(err);
                }
                if (passportUser) {
                    const user = passportUser;
                    user.token = jsonwebtoken_1.default.sign({ user_id: user.id, email: user.email }, this.privateKey, {
                        expiresIn: "2h",
                    });
                    user.password = "";
                    response.cookie('Token', user.token, { maxAge: 900000 });
                    return response.json({ user });
                }
                return response.status(400).send(info);
            })(request, response, next);
        };
        this.registerJWT = async (request, response, next) => {
            try {
                const { email, password, confirmPassword } = request.body;
                const oldUser = await this.usersService.getUserByEmail(email);
                if (password !== confirmPassword) {
                    return response.status(409).send("Passwords are not mutch!");
                }
                if (oldUser) {
                    return response.status(409).send("User Already Exist. Please Login!");
                }
                const isValid = this.postValidator({ email, password, confirmPassword });
                if (!isValid) {
                    throw new customError_1.ValidationError({ name: "ValidationError", message: this.postValidator.errors.map((e) => e.message) });
                }
                const encryptedPassword = await bcrypt_1.default.hash(password, 10);
                const user = await this.usersService.createAUser({
                    id: 0,
                    email: email,
                    password: encryptedPassword,
                });
                const token = jsonwebtoken_1.default.sign({ user_id: user.id, email }, this.privateKey, {
                    expiresIn: "2h",
                });
                user.password = "";
                response.send(Object.assign(Object.assign({}, user), { token }));
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
        this.postValidator = ajv.compile(usersSchema_1.default);
    }
    initializeRoutes() {
        this.router.post("/auth/register", passportMiddleware_1.default.optional, this.registerJWT);
        this.router.post("/auth/login", passportMiddleware_1.default.optional, this.loginPass);
    }
};
AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Users_service_1.default])
], AuthController);
exports.default = AuthController;
