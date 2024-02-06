import { Module } from '@nestjs/common'

import { GamesController } from './games.controller'
import { GamesService } from './games.service'
import { GamesGateway } from './games.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Game } from './models/game.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
      TypeOrmModule.forFeature([
          Game,
          User,
      ]),
      UsersModule,
  ],
  controllers: [GamesController],
  providers: [
      GamesService,
      GamesGateway,
  ],
})
export class GamesModule {}
