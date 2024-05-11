import { NextFunction, Request, Response } from "express";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export const ErrorHandlerMiddleware = (
  error: GlobalErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("middleware:" + error);
  if (error.operational) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
      operational: error.operational,
      type: error.type,
    });
  }

  return res.status(error.statusCode).json({
    name: error.name,
    message: "Something went wrong",
    operational: error.operational,
    type: error.type,
  });
};
