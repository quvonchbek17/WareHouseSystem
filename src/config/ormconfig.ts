import { DataSource } from 'typeorm'
import * as path from 'path'

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'warehouse.cdbklndprnum.us-east-2.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: '1q2w3e4r',
    synchronize: false,
	migrations: [path.join(__dirname, '..', 'migrations', "*.{ts,js}")],
    entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')]
})