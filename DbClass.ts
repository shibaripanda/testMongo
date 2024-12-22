import mongoose from "mongoose"
import { appSchema } from "./model/App"

interface MS {
    model: string
    scheme:  any
}

const modelsList = [{model: 'App', scheme: appSchema}]

export class DbClass {

    modelsList: MS[]
    mongoToken: string | undefined

    constructor(){
        this.modelsList = modelsList
        this.mongoToken = process.env.MONGO_TOKEN
    }

    async mongoUse(dbName: string, modelName: string, func: any){
        return await func(await this.dbConnections(dbName, modelName))
    }
    async dbConnections(dbName: string, modelName: string){
        const db: any = mongoose.connection.useDb(dbName, { useCache: true })
        if(!db.model[modelName]){
            db.model(modelName, this.modelsList.find(item => item.model === modelName)?.scheme)
        }
        console.log('DB name: ', db.name, modelName)
        return db.model(modelName)
    }
    async dbMongoConect (){
        if(this.mongoToken){
            await mongoose.connect(this.mongoToken)
            .then(() => {
                console.log(`# connect to DB`)
            })
            .catch(async (error) => {
                console.log('# problem connecting to DB')
                console.log(error)
            })
        }
        else{
            console.log('undefined mongo token')
        }
    }

}