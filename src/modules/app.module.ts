import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import configuration from '../config'
import { AuthMiddleware } from '@/common/middlewares/auth-token.middleware'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { GamesModule } from './games/games.module'
import { AlsModule } from './als/als.module'
import { PlayersModule } from './players/players.module'

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
                synchronize: true, // TODO only for dev
            }),
        }),
        AlsModule,
        UsersModule,
        AuthModule,
        GamesModule,
        PlayersModule,
    ],
    controllers: [],
    providers: [
        JwtService,
    ],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*')
    }
}
