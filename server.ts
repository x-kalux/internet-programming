import express, { Express, Request, Response } from 'express'
import { IncomingMessage } from 'http';
import path from 'path'
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const https = require('https');
dotenv.config()

const app = express()
const port = process.env.PORT
const password = process.env.MONGODB_PASSWORD
const mongodb_url = `mongodb+srv://xkaluxchimjan:${password}@cluster0.iwiplux.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)
mongoose.connect(mongodb_url);

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World')
})




app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})