import express, { NextFunction, Request, Response } from "express";
import { Role } from "../utils/role.enum";
import RoleService from "../service/role.service";

class RoleController{
    public router: express.Router;

    constructor(private service: RoleService){
        this.router = express.Router();

        this.router.get('/', this.getAll);
    }

    getAll = (req: Request, res: Response, next: NextFunction) => {
        try{
            const roles = this.service.getAll();
            res.status(200).locals.data = roles;
            next();
        }catch(error){
            next(error);
        }
    }
}

export default RoleController;