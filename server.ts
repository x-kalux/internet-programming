import express, { Request, Response } from 'express'
import path from 'path'
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const date = require(__dirname + '/date.js')
dotenv.config()
const port = process.env.PORT

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// const dateOptions: Intl.DateTimeFormatOptions = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
// }
// const today = new Date().toLocaleDateString('th-TH', dateOptions);
const today = date.getDateNow()

const tasks = new Set()
const schoolTask = new Set()

app.get('/', (req: Request, res: Response) => {
    res.render('index', { taskTitle: 'General', today: today, tasks: tasks });
})
app.get('/school', (req: Request, res: Response) => {
    res.render('index', { taskTitle: 'School', today: today, tasks: schoolTask });
})

app.post('/', (req: Request, res: Response) => {
    let _tasks = tasks
    let path = '/'
    if (req.body.type === 'School') {
        _tasks = schoolTask
        path = 'school'
    }
    let newTask = req.body.newTask
    if (newTask !== '') {
        _tasks.add(newTask)
    }
    if (req.body.delete !== undefined) {
        _tasks.delete(req.body.delete)
    }
    res.redirect(path)
})

app.listen(port, () => {
    console.log(`⚡️[SERVER]: Server is running at https://localhost:${port}`)
})