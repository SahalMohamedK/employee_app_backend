import express from "express"
import EmployeeService from "../service/employee.service";

class EmployeeController{
    public router: express.Router;

    constructor(
        private service: EmployeeService
    ){
        this.router = express.Router()

        this.router.get('/', this.getAll)
        this.router.get('/:id', this.getById)
        this.router.post('/', this.create)
        this.router.put('/:id', this.update)
        this.router.delete('/:id', this.delete)
    }

    getId(req: express.Request){
        return Number(req.params.id)
    }

    getBody(req: express.Request, fields: string[]){
        return fields.map(field => req.body[field])
    }

    getAll = async(req: express.Request, res: express.Response) => {
        const employees = await this.service.getAll();
        res.status(200).send(employees)
    }

    getById = async(req: express.Request, res: express.Response) => {
        const id = this.getId(req)
        const employee = await this.service.getById(id);
        res.status(200).send(employee)
    }

    create = async (req: express.Request, res: express.Response) => {
        const [name, email] = this.getBody(req, ['name', 'email'])

        const employee = await this.service.create(name, email);
        res.status(200).send(employee)
    }

    update = async (req: express.Request, res: express.Response) => {
        const id = this.getId(req)
        const [name, email] = this.getBody(req, ['name', 'email'])

        const employee = await this.service.update(id, name, email)
        res.status(200).send(employee)
    }

    delete = async (req: express.Request, res: express.Response) => {
        const id = this.getId(req)
        await this.service.softRemove(id)
        res.status(200).send({message: `Employee with id ${id} deleted`})
    }
}

export default EmployeeController