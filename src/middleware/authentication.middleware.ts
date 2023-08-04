import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"
import HttpException from "../exception/http.exception";

const authenticate = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try{
        const token = getTokenFromRequestHeader(req)
        jsonwebtoken.verify(token, "ABCDE");
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