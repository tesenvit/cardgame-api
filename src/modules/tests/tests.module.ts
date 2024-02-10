import { Module } from '@nestjs/common'
import { TestsService } from './tests.service'
import { TestsController } from './tests.controller'
import { UsersModule } from '../users/users.module'
import { GamesModule } from '../games/games.module'
import { PlayersModule } from '../players/players.module'

@Module({
    imports: [
        UsersModule,
        GamesModule,
        PlayersModule,
    ],
    controllers: [TestsController],
    providers: [TestsService],
})
export class TestsModule {}
