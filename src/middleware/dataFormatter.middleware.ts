import { NextFunction, Request, Response } from "express";
import { getReasonPhrase } from "http-status-codes";

function dataFormatter(req: Request, res: Response, next: NextFunction) {
  try{
    const output = {
      status: res.statusCode,
      data: res.locals.data?res.locals.data: null,
      message: res.locals.error?.message ? res.locals.error.message : getReasonPhrase(res.statusCode),
      errors: res.locals.error?.errors ? res.locals.error.errors : null,
      meta: { length: res.locals.data? res.locals.data.length: 0, took: 0, total: 0 },
    };
    res.send(output)
  }catch(error){
    next(error)
  }
}

export default dataFormatter;
