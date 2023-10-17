import express from "express";
import { ExtRequest } from "../../interfaces";

const pageOptionsMiddleware =
  (defaultSize: number = 5) =>
  (
    request: ExtRequest,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const page = Number(request.query.page) || 0;
    const size = Number(request.query.size) || defaultSize;
    request.pageOptions = { page, size };
    next();
  };

export default pageOptionsMiddleware;
