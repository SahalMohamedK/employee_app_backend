import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import { plainToInstance } from "class-transformer";
import CreateEmplopyeeDto from "../dto/createEmployee.dto";
import { validate } from "class-validator";
import HttpException from "../exception/http.exception";
import LoginEmplopyeeDto from "../dto/loginEmployee.dto";
import authenticate from "../middleware/authentication.middleware";
import autherize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";

class EmployeeController {
  public router: express.Router;

  constructor(private service: EmployeeService) {
    this.router = express.Router();

    this.router.post("/login", this.login);
    this.router.get("/", authenticate, this.getAll);
    this.router.get("/:id", authenticate, this.getById);
    this.router.post("/", authenticate, autherize([Role.HR, Role.DEVELOPER]), this.create);
    this.router.put("/:id", authenticate, this.update);
    this.router.delete("/:id", authenticate, this.softRemove);
  }

  getId(req: express.Request) {
    return Number(req.params.id);
  }

  login = async(req: express.Request, res: express.Response, next: NextFunction) => {
    try{
      const loginEmplopyeeDto = plainToInstance(LoginEmplopyeeDto, req.body);
      const errors = await validate(loginEmplopyeeDto)
      if(errors.length){
        throw new HttpException(400, JSON.stringify(errors))
      }else{
        const token = await this.service.login(loginEmplopyeeDto)
        res.status(200).send(token)
      }
    }catch(error){
      next(error)
    }
  }

  getAll = async (req: express.Request, res: express.Response) => {
    const employees = await this.service.getAll();
    res.status(200).send(employees);
  };

  getById = async (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const id = this.getId(req);
      const employee = await this.service.getById(id);
      res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try{
      const createEmployeeDto = plainToInstance(CreateEmplopyeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if(errors.length){
        throw new HttpException(400, JSON.stringify(errors))
      }else{
        const employee = await this.service.create(createEmployeeDto);
        res.status(200).send(employee);
      }
    }catch(error){
      next(error)
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    const id = this.getId(req);
    // const [name, email, address] = this.getBody(req, ["name","email","address"]);

    // const employee = await this.service.update(id, name, email, address);
    // res.status(200).send(employee);
  };

  softRemove = async (req: express.Request, res: express.Response) => {
    const id = this.getId(req);
    await this.service.softRemove(id);
    res.status(200).send({ message: `Employee with id ${id} deleted` });
  };
}

export default EmployeeController;
