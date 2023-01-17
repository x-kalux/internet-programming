import express, { Express, Request, Response } from 'express'
import { Schema, Document } from 'mongoose';//<----
const date = require(__dirname + '/date.js');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const mongoose = require('mongoose') //<----
mongoose.set('strictQuery', true)   //<----
mongoose.connect(process.env.MONGODB_URL); //<----
interface ITodo extends Document { //<----
    task: String,
    isDone: Boolean,
    taskTitle: String,
    date: Date
}
const todoSchema = new Schema({ //<----
    task: String,
    isDone: Boolean,
    taskTitle: String,
    date: { type: Date, default: Date.now }
})
const Todo = mongoose.model('Todo', todoSchema) //<----

const app = express()
const port = process.env.PORT
const appid = process.env.APIKEY
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')


const toDay = date.getDateToDay();
//const todoHome = new Set()
const todoSchool = new Set()
app.get('/', (request: Request, response: Response) => {
    const htmlFile = path.join(__dirname, '..', '/src/index.html')
    response.sendFile(htmlFile)
})

app.post('/', (request: Request, response: Response) => {
    const query = request.body.query
    const unit = 'metric'
    const lang = 'th'
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather'
    const url = `${endpoint}?q=${query}&units=${unit}&lang=${lang}&appid=${appid}`
    https.get(url, (res: IncomingMessage) => {
        res.on('data', (data) => {
            const jsonData = JSON.parse(data)
            response.write(`<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Fist WebApp</title>
            </head><body>`)
            if (jsonData.cod !== 200) {
                response.write(`<h1>search(city): ${query}</h1>`)
                response.write(`<h2>${jsonData.message}</h2>`)
            } else {
                response.write(`<h1>the weather in ${jsonData.name}</h1>`)
                response.write(`<h2>${jsonData.weather[0].main}</h2>`)
                response.write(`<h3>${jsonData.weather[0].description}</h3>`)
            }
            response.write('<a href="/">back</a>')
            response.write('<body>')
            console.log(jsonData)

            response.send()
        })
    })
})



app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})