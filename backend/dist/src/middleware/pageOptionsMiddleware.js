"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pageOptionsMiddleware = (defaultSize = 5) => (request, response, next) => {
    const page = Number(request.query.page) || 0;
    const size = Number(request.query.size) || defaultSize;
    request.pageOptions = { page, size };
    next();
};
exports.default = pageOptionsMiddleware;
