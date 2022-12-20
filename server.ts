import express, { Express, Request, Response } from 'express'
import { IncomingMessage } from 'http';
import path from 'path'
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const https = require('https');
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World')
})




app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})