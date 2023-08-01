import express from 'express'

const server = express();

server.get('/', (req, res) => {
    res.status(200).send("testjfsdfkjahsdkflhadsing")
})

server.listen(3000, () => {
    console.log("server is listening to port 3000")
})