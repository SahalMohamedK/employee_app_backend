import express from "express"
import Employee from "./Employee";

const employeeRouter = express.Router();

let count = 2;

const employees: Employee[] = [
    {
        id: 1,
        name: "Sahal Mohamed",
        email: "sahalkunnummal@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        name: "Harry Potter",
        email: "harrypotter@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]


employeeRouter.get('', (req, res) => {
    res.status(200).send(employees)
})

employeeRouter.get('/:id', (req, res) => {
    const id:number = Number(req.params.id)
    const employee = employees.find(employee => employee.id === id)
    if(employee){
        res.status(200).send(employee)
    }else{
        res.status(400).send({message: `No employee with the id ${id}`})
    }
})

employeeRouter.post('', (req, res) => {
    const employee = new Employee();
    employee.id = ++count;
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.createdAt = new Date()
    employee.updatedAt = new Date()

    employees.push(employee);

    res.status(200).send(employee)
})

employeeRouter.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const employee = employees.find(employee => employee.id === id)
    employee.name = req.body.name
    employee.email = req.body.email
    employee.updatedAt = new Date()

    res.status(200).send(employee)
})

employeeRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const idx = employees.findIndex(employee => employee.id === id)
    if(idx === -1){
        res.status(400).send({message: `No employee with the id ${id}`})
    }else{
        employees.splice(idx, 1)
        
        res.status(200).send({message: `Employee with id ${id} deleted`})
    }
})

export default employeeRouter