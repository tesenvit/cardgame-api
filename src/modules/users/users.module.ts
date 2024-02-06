import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AsyncLocalStorage } from 'async_hooks'
import { JwtService } from '@nestjs/jwt'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { PlayersService } from '../players/players.service'
import { PlayersModule } from '../players/players.module'
import { Player } from '../players/entities/player.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Player,
        ]),
        PlayersModule,
    ],
    controllers: [UsersController],
    providers: [
        AsyncLocalStorage,
        UsersService,
        JwtService,
        PlayersService,
    ],
    exports: [
        AsyncLocalStorage,
        UsersService,
    ],
})
export class UsersModule {}
