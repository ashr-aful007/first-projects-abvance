/* eslint-disable @typescript-eslint/no-unused-vars */
// Import necessary modules
import express, { Application, Request, Response,  } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'

// Create an instance of Express application
const app: Application = express()

// Middleware: Enable JSON parsing and CORS
app.use(express.json())
app.use(cors())

//application route
app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


//error hangling 
// eslint-disable-next-line no-unused-vars, no-undef
app.use(globalErrorHandler)
app.use(notFound)  



export default app
