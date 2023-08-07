import { NextFunction, Request, Response } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import ValidationException from "../exception/validation.exception";

function convertError(errors: ValidationError[]){
    const convertedErrors = {};
    errors.forEach(error => {
        if(error.children.length){
            convertedErrors[error.property] = convertError(error.children);
        }else{
            convertedErrors[error.property] = Object.values(error.constraints);
        }
    })
    return convertedErrors;
}

function validateBody(Dto: ClassConstructor<unknown>){
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(Dto, req.body);
        const errors = await validate(dto as object);
        
        if(errors.length){
            next(new ValidationException(400, convertError(errors)))
        }else{
            req.body = dto
            next()
        }
    }
}

export default validateBody