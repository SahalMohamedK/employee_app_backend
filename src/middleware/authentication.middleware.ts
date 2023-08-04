import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"
import HttpException from "../exception/http.exception";
import { jwtPayload } from "../utils/jwtPayload.type";
import { RequestWithUser } from "../utils/requestWithUser";
import { JWT_SECRET_KET } from "../config";

const authenticate = async (
    req: RequestWithUser, 
    res: Response, 
    next: NextFunction
) => {
    try{
        const token = getTokenFromRequestHeader(req)
        const payload: jwtPayload = jsonwebtoken.verify(token, JWT_SECRET_KET) as jwtPayload;
        req.user = payload
    
        next();
    }catch(error){
        next(new HttpException(401, "Authentication required"))
    }
}

const getTokenFromRequestHeader = (req: Request) => {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", ""): ""
    return token
}

export default authenticate;