import express, { Express, Request, Response } from 'express'
import path from 'path'
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})