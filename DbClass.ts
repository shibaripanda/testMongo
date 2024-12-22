import mongoose from "mongoose"
import { appSchema } from "./model/App"

export class DbClass {

    modelsList: any

    constructor(){
        this.modelsList = {
            'App': appSchema
        }
    }

    async mongoUse(dbName: string, modelName: string, func: any){
        return await func(await this.dbConnections(dbName, modelName))
    }
    async dbConnections(dbName: string, modelName: string){

        const db: any = mongoose.connection.useDb(dbName, { useCache: true })
        if(!db.model[modelName]){
            db.model(modelName, this.modelsList[modelName])
        }
        console.log('Db name: ', db.name, modelName)
        return db.model(modelName)
        
    }
    async dbMongoConect (){
        let status = false
        if(process.env.MONGO_TOKEN)
        await mongoose.connect(process.env.MONGO_TOKEN)
        .then((res) => {
            console.log(`# connect to DB`)
            status = true
        })
        .catch(async (error) => {
            console.log('problem connecting to DB')
            console.log(error)
        })
        return status
    }

}