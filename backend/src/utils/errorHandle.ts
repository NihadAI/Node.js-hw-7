import { Request, Response, NextFunction } from "express";
import { AppError } from "./customError";
import logger from "./logger";
import sentryLog from "./sentry";

const errorHandle = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV === 'production') {
    if (err instanceof AppError) {
      sentryLog(err);
      logger.warn(`${err}`)
      return res.status(err.httpCode).json({name: err.name, message: err.message });
    } else {
      sentryLog(err);
      logger.error(`Message: ${err.message}`);
      res.status(500).json({ name: err.name, message: err.message });
    }
  } else {
    if (err instanceof AppError) {
      sentryLog(err);
      logger.warn(`${err}`)
      return res.status(err.httpCode).json({name: err.name, message: err.message });
    } else {
      sentryLog(err);
      logger.error(`Message: ${err.message}, Stack: ${err.stack}`);
      res.status(500).json({ name: err.name, message: err.message, stack: err.stack });
    }
  }

  
};

export default errorHandle;
