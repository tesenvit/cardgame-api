import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      MongooseModule.forRoot(
          `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`
      ),
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
