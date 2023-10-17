import winston from 'winston';
import express from 'express';
import DailyRotateFile from 'winston-daily-rotate-file';

// Init transports
const consoleTransport = new winston.transports.Console();
const errorTransport = new DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '1m',
  maxFiles: '7d',
});
const applicationTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '1m', 
  maxFiles: '7d',
});


// Formatter
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${
    typeof message === 'object' ? JSON.stringify(message) : message
  }`;
});

const myWinstonOptions = {
  format: combine(timestamp(), myFormat),
  transports: [consoleTransport, applicationTransport, errorTransport],
};

const logger = winston.createLogger(myWinstonOptions);

export function logRequest(req: express.Request, _res: express.Response, next: express.NextFunction) {
  let logMessage = `Method: ${req.method}, URL: ${req.url}`;
  if (Object.keys(req.body).length > 0) {
    logMessage += `, Body: ${JSON.stringify(req.body)}`;
  }
  logger.info(logMessage);
  next();
}

export default logger;
