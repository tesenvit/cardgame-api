import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { PlayersService } from '../players/players.service'
import { PlayersModule } from '../players/players.module'
import { Player } from '../players/entities/player.entity'
import { AlsModule } from '../als/als.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Player,
        ]),
        AlsModule,
        PlayersModule,
    ],
    controllers: [
        UsersController,
    ],
    providers: [
        UsersService,
        PlayersService,
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule {}
