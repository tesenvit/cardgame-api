import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

import configuration from '../configs/app.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { GamesModule } from './games/games.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            // cache: true,
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('db.mongo.uri'),
            }),
        }),
        UsersModule,
        AuthModule,
        GamesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
