"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errorHandle_1 = __importDefault(require("./utils/errorHandle"));
const logger_1 = require("./utils/logger");
const express_session_1 = __importDefault(require("express-session"));
const passportConfig_1 = __importDefault(require("./utils/passportConfig"));
const convictConfig_1 = __importDefault(require("./utils/convictConfig"));
class App {
    constructor(controllers, port, host) {
        this.secretKey = convictConfig_1.default.get('SECRET_KEY');
        this.corsOptions = {
            origin: 'http://localhost:3000',
            credentials: true,
        };
        this.app = (0, express_1.default)();
        this.port = port;
        this.host = host;
        this.initializeMiddlewares();
        this.initializePassport();
        this.initializeControllers(controllers);
        this.initializeErrorHandle();
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)(this.corsOptions));
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_session_1.default)({
            secret: this.secretKey,
            cookie: { maxAge: 60000 },
            resave: false,
            saveUninitialized: false,
        }));
        this.app.use(logger_1.logRequest);
    }
    initializePassport() {
        (0, passportConfig_1.default)();
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initializeErrorHandle() {
        this.app.use(errorHandle_1.default);
    }
    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`App listening on http://${this.host}:${this.port}`);
        });
    }
}
exports.default = App;
