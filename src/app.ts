// Import necessary modules
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRouts } from './app/modules/student/student.route'

// Create an instance of Express application
const app: Application = express()

// Middleware: Enable JSON parsing and CORS
app.use(express.json())
app.use(cors())

//application route
app.use('/api/v1/students', studentRouts)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


export default app
