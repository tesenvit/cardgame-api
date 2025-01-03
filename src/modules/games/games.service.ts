import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

// import { CreateGameDto } from '@/modules/games/dto/create-game.dto'
// import { GameStatus } from '@/modules/games/types/game.constants'
import { Game } from '@/modules/games/entities/game.entity'
// import { JoinGameDto } from '@/modules/games/dto/join-game.dto'
import { PlayersService } from '@/modules/players/players.service'
// import { BadRequestException } from '@/common/exceptions/bad-request.exception'

@Injectable()
export class GamesService {

    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        private playersService: PlayersService,
    ) {}

    async findAll() {
        return this.gamesRepository.find()
    }

    // async create(createGameDto: CreateGameDto): Promise<Game> {
    //     const gameExist = await this.gamesRepository.findOneBy({ title: createGameDto.title })
    //     if (gameExist) {
    //         throw new BadRequestException({ title: 'A game with the same title already exists' })
    //     }
    //
    //     const currentPlayer = await this.usersService.getCurrentUser()
    //
    //     if (currentPlayer.game) {
    //         throw new BadRequestException({ gameId: 'Player is already in another game' })
    //     }
    //
    //     const game = this.gamesRepository.create({
    //         title: createGameDto.title,
    //         password: createGameDto.password || '',
    //         status: GameStatus.CREATED,
    //         users: [currentPlayer],
    //     })
    //
    //     return await this.gamesRepository.save(game)
    // }

    // async join(joinGameDto: JoinGameDto): Promise<void> {
    //     const game = await this.gamesRepository.findOneBy({ id: joinGameDto.gameId })
    //     if (!game) {
    //         throw new NotFoundException()
    //     }
    //
    //     const password = joinGameDto.password || ''
    //     if (game.password && (game.password !== password)) {
    //         throw new BadRequestException({ password: 'Wrong password' })
    //     }
    //
    //     const currentPlayer = await this.usersService.getCurrentUser()
    //
    //     if (currentPlayer.game) {
    //         const error = (currentPlayer.game.id === game.id)
    //             ? 'Player is already in this game'
    //             : 'Player is already in another game'
    //         throw new BadRequestException({ gameId: error })
    //     }
    //
    //     game.users.push(currentPlayer)
    //
    //     await this.gamesRepository.save(game)
    // }

    async delete(id: string): Promise<void> {
        const deletedUser = await this.gamesRepository.findOneBy({ id })
        if (!deletedUser) {
            throw new NotFoundException()
        }

        await this.gamesRepository.delete(id)
    }
}
