import { Module, forwardRef } from '@nestjs/common'

import { PlayersService } from './players.service'
import { PlayersController } from './players.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Player } from './entities/player.entity'
import { UsersService } from '../users/users.service'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Player]),
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
