import express from "express"
import Employee from "./Employee";
import dataSource from "./dataSource";

const employeeRouter = express.Router();

employeeRouter.get('', async (req, res) => {
    const employeeRepo = dataSource.getRepository(Employee)
    const employees = await employeeRepo.find()

    res.status(200).send(employees)
})

employeeRouter.get('/:id', async(req, res) => {
    const id:number = Number(req.params.id)
    
    const employeeRepo = dataSource.getRepository(Employee)
    const employee = await employeeRepo.findOneBy({id})

    if(employee){
        res.status(200).send(employee)
    }else{
        res.status(400).send({message: `No employee with the id ${id}`})
    }
})

employeeRouter.post('', async(req, res) => {
    const employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;

    const employeeRepo = dataSource.getRepository(Employee)
    const saveEmployee = await employeeRepo.save(employee)

    res.status(200).send(saveEmployee)
})

employeeRouter.put('/:id', async (req, res) => {
    const id = Number(req.params.id)

    const employeeRepo = dataSource.getRepository(Employee)
    const employee = await employeeRepo.findOneBy({id})
    if(employee){
        employee.name = req.body.name
        employee.email = req.body.email
        const saveEmployee = await employeeRepo.save(employee)
    
        res.status(200).send(saveEmployee)
    }else{
        res.status(400).send({message: `No employee with the id ${id}`})
    }

})

employeeRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    
    const employeeRepo = dataSource.getRepository(Employee)
    const employee = await employeeRepo.findOneBy({id})

    if(employee){
        await employeeRepo.remove(employee)
        res.status(200).send({message: `Employee with id ${id} deleted`})
    }else{
        res.status(400).send({message: `No employee with the id ${id}`})
    }
})

export default employeeRouter