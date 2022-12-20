import express, { Express, Request, Response } from 'express'

const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const dateOption: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
const toDay = new Date().toLocaleDateString('th-TH', dateOption);
const todoList = new Set()
app.get('/', (request: Request, response: Response) => {
    response.render('index', { today: toDay, tasks: todoList })
})

app.post('/', (request: Request, response: Response) => {
    const newTask = request.body.newTask
    todoList.add(newTask)
    response.redirect('/')
})

app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})