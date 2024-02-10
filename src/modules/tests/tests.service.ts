import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { GamesService } from '../games/games.service'
import { PlayersService } from '../players/players.service'

@Injectable()
export class TestsService {

    constructor(
        private userService: UsersService,
        private gamesService: GamesService,
        private playersService: PlayersService,
    ) {}

    async getAll() {
        const users = await this.userService.findAll()
        const players = await this.playersService.findAll()
        const games = await this.gamesService.findAll()
        return {
            users,
            players,
            games,
        }
    }
}
