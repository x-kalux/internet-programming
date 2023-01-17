import express, { Express, Request, Response } from 'express'
import { IncomingMessage } from 'http';
import { Mongoose, Schema } from 'mongoose';
import path from 'path'
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const https = require('https');
dotenv.config()

const app = express()
const port = process.env.PORT
const password = process.env.MONGODB_PASSWORD
const dbname = process.env.MONGODB_DB
const mongodb_url = `mongodb+srv://xkaluxchimjan:${password}@cluster0.iwiplux.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)
mongoose.connect(mongodb_url);

interface ITodo {
    task: String,
    isDone: Boolean,
    date: Date
}
const todoSchema = new Schema({
    task: String,
    isDone: Boolean,
    date: { type: Date, default: Date.now }
})
const Todo = mongoose.model('Todo', todoSchema)
// const gotoSchool = new Todo({
//     task: "goto School",
//     isDone: true
// })
// const buyMilk = new Todo({
//     task: "buy milk",
//     isDone: false
// })
// Todo.insertMany([gotoSchool, buyMilk], (err: string) => {
//     if (err)
//         console.log(err)
//     else
//         console.log('data saved.')
// })
// todo.save()

// Todo.updateOne({ task: 'test' }, { task: 'test example' }, (err: string) => {
//     if (err)
//         console.log(err)
//     else {
//         console.log('succesfully updated.')
//     }
// })

Todo.deleteOne({ task: 'test example' }, (err: string) => {
    if (err)
        console.log(err)
    else
        console.log('delete test example succesfuly')
})

// Todo.find(function (err: string, todos: ITodo[]) {
//     if (err)
//         console.log(err)
//     else {
//         todos.forEach((item) => {
//             console.log(`${item.task} : ${item.isDone} ${item.date}`)
//         })
//     }
// })

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request: Request, response: Response) => {
    response.send('Hello World')
})




app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})