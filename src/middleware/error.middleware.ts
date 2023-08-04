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
      res.status(error.status).send({ message: error.message });
    } else {
      res.status(500).send({ message: error.message });
    }
  } catch (err) {
    next(err);
  }
}

export default errorMiddleware;
