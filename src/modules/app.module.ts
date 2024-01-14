import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
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
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('db.postgres.url'),
                autoLoadEntities: true,

                // TODO only for dev
                synchronize: true,
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
