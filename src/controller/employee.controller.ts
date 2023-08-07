import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import EmplopyeeDto from "../dto/employee.dto";
import LoginDto from "../dto/login.dto";
import authenticate from "../middleware/authentication.middleware";
import validateBody from "../middleware/validate.middleware";
import autherize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";

class EmployeeController {
  public router: express.Router;

  constructor(private service: EmployeeService) {
    this.router = express.Router();

    // employee login
    this.router.post("/login", validateBody(LoginDto), this.login);

    // get all employee
    this.router.get("/", authenticate, this.getAll);

    // get a employee by id
    this.router.get("/:id", authenticate, this.getById);

    // create employee
    this.router.post(
      "/",
      authenticate,
      autherize([Role.ADMIN, Role.HR]),
      validateBody(EmplopyeeDto),
      this.create
    );

    // update employee
    this.router.put(
      "/:id",
      authenticate,
      autherize([Role.ADMIN, Role.HR]),
      validateBody(EmplopyeeDto),
      this.update
    );

    // delete employee
    this.router.delete(
      "/:id",
      authenticate,
      autherize([Role.ADMIN, Role.HR]),
      this.softRemove
    );
  }

  login = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try{
      const data = await this.service.login(req.body);
      res.status(200).locals.data = data;
      next();
    }catch(error){
      next(error)
    }
  };

  getAll = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    const employees = await this.service.getAll();
    res.status(200).locals.data = employees;
    next();
  };

  getById = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const employee = await this.service.getById(id);
      res.status(200).locals.data = employee;
      next();
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.service.create(req.body);
      res.status(200).locals.data = employee;
      next();
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const employee = await this.service.update(req.params.id, req.body);
      res.status(200).locals.data = employee;
      next();
    } catch (error) {
      next(error);
    }
  };

  softRemove = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      await this.service.softRemove(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;
