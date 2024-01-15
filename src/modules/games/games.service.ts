import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateGameDto } from './dto/create-game.dto'
import { IGame } from './interfaces/game.interface'
import { Game } from './models/game.entity'
import { UsersService } from '../users/users.service'


@Injectable()
export class GamesService {

    static readonly GAME_STATUS_CREATED = 'created'
    static readonly GAME_STATUS_PROGRESS = 'progress'
    static readonly GAME_STATUS_COMPLETED = 'completed'

    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        private userService: UsersService
    ) {}

    async create(createGameDto: CreateGameDto) {
        const user = await this.userService.getById(1)

        const game = new Game()
        game.title = createGameDto.title
        game.password = createGameDto.password || ''
        game.status = GamesService.GAME_STATUS_CREATED
        game.owner = user.id
        game.users = [user]

        return await this.gamesRepository.save(game)
    }
}
