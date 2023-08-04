import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
  console.log(
    `------------ logger -----------\nTime: ${new Date()}\nUrl: ${
      req.url
    }\nMethod: ${req.method}\n`
  );
  next();
};

export default loggerMiddleware;
