import type { NextFunction, Request, Response } from "express";
import config from "../config";

interface IAppError extends Error {
  statusCode?: number;
}

const globalErrorHandler = (
  err: IAppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: config.environment === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
