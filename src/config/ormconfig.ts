import { DataSource } from 'typeorm'
import * as path from 'path'

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'jelani.db.elephantsql.com',
    port: 5432,
    username: 'ipalgdqc',
    password: 'RNc9dzidxsedjD5_83h9QbWHQ_oMwdqQ',
    synchronize: true,
    entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')]
})