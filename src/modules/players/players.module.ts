import { Module } from '@nestjs/common'

import { PlayersService } from './players.service'
import { PlayersController } from './players.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Player } from './entities/player.entity'
import { AlsModule } from '../als/als.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Player]),
        AlsModule,
    ],
    controllers: [PlayersController],
    providers: [
        PlayersService,
    ],
    exports: [
        PlayersService,
    ],
})
export class PlayersModule {}
