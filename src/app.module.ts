import { Module } from '@nestjs/common'
import { ConfigAppModule } from './config.module'
import { UsersModule } from './users/users.module'
import { MongooseAppModule } from './db/mongoose.module'

@Module({
  imports: [
      ConfigAppModule,
      MongooseAppModule,
      UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
