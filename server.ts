import * as express from 'express'
import { dataSource } from './src/config/ormconfig'

const app: express.Application = express();

app.use(express.json());

dataSource
  .initialize()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => {
  console.log(8080);
});
