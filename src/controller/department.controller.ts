import express, { NextFunction, Request, Response } from "express";
import DepartmentService from "../service/department.service";
import authenticate from "../middleware/authentication.middleware";
import autherize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import validateBody from "../middleware/validate.middleware";
import DepartmentDto from "../dto/department.dto";

class DepartmentController {
  public router: express.Router;

  constructor(private service: DepartmentService) {
    this.router = express.Router();

    // get all department
    this.router.get("/", authenticate, this.getAll);

    // get department by id
    this.router.get("/:id", authenticate, this.getById);

    // create department
    this.router.post(
      "/",
      authenticate,
      autherize([Role.ADMIN, Role.HR]),
      validateBody(DepartmentDto),
      this.create
    );

    // edit department
    this.router.put(
      "/:id",
      authenticate,
      autherize([Role.ADMIN, Role.HR]),
      this.update
    );

    // delete department
    this.router.delete(
      "/:id",
      authenticate,
      autherize([Role.ADMIN, Role.HR]),
      this.softRemove
    );
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const department = await this.service.getAll();
      res.status(200).locals.data = department;
      next();
    }catch(error){
      next(error)
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const department = await this.service.getById(id);
      res.status(200).locals.data = department;
      next();
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const department = await this.service.create(req.body);
      res.status(200).locals.data = department;
      next();
    }catch(error){
      next(error)
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const department = await this.service.update(req.params.id, req.body);
      res.status(200).locals.data = department;
      next();
    } catch (error) {
      next(error);
    }
  };

  softRemove = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.service.softRemove(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

export default DepartmentController;
