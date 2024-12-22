import 'dotenv/config'
import { DbClass } from './DbClass'

const db = new DbClass()

db.dbMongoConect()

const getData = async () => {
    const res = await db.mongoUse('hello9', 'App', (m: any) => m.find({app: 'test'}))
    console.log('res', res)
}

getData()

console.log('work done')

