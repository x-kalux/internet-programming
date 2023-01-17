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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')


const toDay = date.getDateToDay();
//const todoHome = new Set()
const todoSchool = new Set()
app.get('/', (request: Request, response: Response) => {
    Todo.find({ taskTitle: 'Home' }, (err: string, todoHome: ITodo[]) => {
        if (err)
            response.send(err)
        else
            response.render('index', { today: toDay, tasks: todoHome, taskTitle: "Home" })
    })

})
app.get('/school', (request: Request, response: Response) => {
    Todo.find({ taskTitle: 'School' }, (err: string, todoHome: ITodo[]) => {
        if (err)
            response.send(err)
        else
            response.render('index', { today: toDay, tasks: todoHome, taskTitle: "School" })
    })
})

app.post('/', (request: Request, response: Response) => {

    let path = '/'
    const newTask = request.body.newTask
    const taskType = request.body.type
    if (request.body.type === 'School') {
        path = 'school'
    }
    if (request.body.isDone !== '') {
        const update_id = request.body.isDone
        Todo.findOneAndUpdate({ _id: update_id }, [{ $set: { isDone: { $not: "$isDone" } } }], () => {
            response.redirect(path)
        })
    }
    if (newTask !== '') {
        const task = new Todo({
            task: newTask,
            isDone: false,
            taskTitle: taskType
        })
        task.save()
        response.redirect(path)
    }
    if (request.body.delete !== undefined) {
        const delete_id = request.body.delete
        Todo.findByIdAndDelete(delete_id, (err: string) => {
            if (err) {
                response.send(err)
            } else {
                response.redirect(path)
            }
        })
    }

})

app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})