import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './users/users.module'

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`,
          isGlobal: true
      }),
      MongooseModule.forRoot(process.env.MONGO_URI),
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
