import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { Player } from './entities/player.entity'
import { ValidateException } from '../../common/exceptions/validate.exception'

@Injectable()
export class PlayersService {

    constructor(
    @InjectRepository(Player)
        private playersRepository: Repository<Player>,
    ) {}

    async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const { username } = createPlayerDto
        const currentPlayer = await this.playersRepository.findOneBy({ username })
        if (currentPlayer) {
            throw new ValidateException({ username: 'username already exists' })
        }

        const player = new Player()
        player.username = username

        return await this.playersRepository.save(player)
    }

    async findAll(): Promise<Player[]> {
        return this.playersRepository.find({ relations: { game: true } } )
    }

    findOne(id: string): Promise<Player> {
        const player = this.playersRepository.findOne({
            where: {
                id,
            },
            relations: {
                game: true,
            },
        })
        if (!player) {
            throw new NotFoundException()
        }

        return player
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        const player = await this.playersRepository.findOneBy({ id })
        if (!player) {
            throw new NotFoundException()
        }

        await this.playersRepository.update(id, updatePlayerDto)

        return await this.playersRepository.findOneBy({ id })
    }

    async delete(id: string): Promise<void> {
        const player = await this.playersRepository.findOneBy({ id })
        if (!player) {
            throw new NotFoundException()
        }

        await this.playersRepository.delete(id)
    }

    generateUsername(): string {
        return `player_${(new Date()).getTime()}`
    }
}
