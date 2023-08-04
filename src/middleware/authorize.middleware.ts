import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import HttpException from "../exception/http.exception";
import { Role } from "../utils/role.enum";

const autherize = (roles: Role[]) => {
    return (
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) => {
        try{
            if(!roles.includes(req.user.role)){
                throw new HttpException(403, "Unautherized user")
            }
            next()
        }catch(error){
            next(error)
        }
    }
}

export default autherize