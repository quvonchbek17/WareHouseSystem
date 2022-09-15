<<<<<<< HEAD
=======

import dotenv from 'dotenv'
>>>>>>> f2e0f089e55a8c41bac6bcc78d40fe4e5a9b0301
import express from 'express'
import { dataSource } from './src/config/ormconfig'
import routes from './src/routes/routes'

dotenv.config()

const app: express.Application = express()

app.use(express.json());
app.use(routes);

console.log("Ok");

dataSource
  .initialize()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log(8080);
});
