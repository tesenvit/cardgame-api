import { Module } from '@nestjs/common'

import { GamesController } from './games.controller'
import { GamesService } from './games.service'
import { GamesGateway } from './games.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/models/user.entity'
import { Game } from './models/game.entity'
import { UsersService } from '../users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Game, User])],
  controllers: [GamesController],
  providers: [
      GamesService,
      GamesGateway,
      UsersService,
  ],
})
export class GamesModule {}
