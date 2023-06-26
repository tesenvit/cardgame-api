import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

const HOST = process.env.MONGODB_HOST
const DB_NAME = process.env.MONGODB_DB

const uri = `mongodb://${HOST}/${DB_NAME}`

@Module({
    imports: [
        MongooseModule.forRoot(uri)
    ]
})
export class MongooseAppModule {}
