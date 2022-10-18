import dotenv from 'dotenv'
import express from 'express'
import { dataSource } from './src/config/ormconfig'
import { CustomErrorHandler } from './src/errors/errorHandler'
import { errorHandler } from './src/middlewares/errorHandle.middleware'
import routes from './src/routes/routes'

dotenv.config()

const app: express.Application = express()

app.use(express.json())

dataSource
.initialize()
.then(() => console.log("Connected"))
.catch((err) => console.log(err));

app.use(routes)
app.use('*', (_: express.Request, __: express.Response, next: express.NextFunction) => {
	next(new CustomErrorHandler(`given path not found`, 404))
})
app.use(errorHandler)

app.listen(8080, (): void => {
  console.log(8080)
})
