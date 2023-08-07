import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (error instanceof HttpException) {
      res.status(error.status)
    }

    res.locals.error = error;
    next()
  } catch (err) {
    next(err);
  }
}

export default errorMiddleware;
