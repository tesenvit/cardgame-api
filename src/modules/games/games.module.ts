import { Module } from '@nestjs/common'

import { GamesController } from './games.controller'
import { GamesService } from './games.service'
import { GamesGateway } from './games.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Game } from './entities/game.entity'
import { Player } from '../players/entities/player.entity'
import { PlayersModule } from '../players/players.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Game,
            Player,
        ]),
        PlayersModule,
    ],
    controllers: [GamesController],
    providers: [
        GamesService,
        GamesGateway,
    ],
    exports: [
        GamesService,
    ],
})
export class GamesModule {}
