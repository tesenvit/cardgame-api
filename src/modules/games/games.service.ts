import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateGameDto } from './dto/create-game.dto'
import { IGame } from './types/game.interfaces'
import { GameStatus } from './types/game.constants'
import { Game } from './models/game.entity'
import { UsersService } from '../users/users.service'
import { JoinGameDto } from './dto/join-game.dto'

@Injectable()
export class GamesService {

    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        private usersService: UsersService,
    ) {}

    async getAll() {
        return this.gamesRepository.find()
    }

    async create(createGameDto: CreateGameDto) {
        const user = await this.usersService.getCurrentUser()

        const game = new Game()
        game.title = createGameDto.title
        game.password = createGameDto.password || ''
        game.status = GameStatus.CREATED
        game.owner = user.id
        // game.users = [user]

        return await this.gamesRepository.save(game)
    }

    async join(joinGameDto: JoinGameDto) {
        const game = await this.gamesRepository.findOneBy({ id: joinGameDto.gameId })
        if (!game) {
            throw new NotFoundException()
        }

        const user = await this.usersService.getCurrentUser()

    }

    async delete(id: string): Promise<void> {
        const deletedUser = await this.gamesRepository.findOneBy({ id })
        if (!deletedUser) {
            throw new NotFoundException()
        }

        await this.gamesRepository.delete(id)
    }
}
