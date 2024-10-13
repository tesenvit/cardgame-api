import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AsyncLocalStorage } from 'async_hooks'

import { CreatePlayerDto } from './dto/create-player.dto'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { Player } from './entities/player.entity'
import { BadRequestException } from '../../common/exceptions/bad-request.exception'
import { AuthTokenStore } from '../als/types/als.interface'

@Injectable()
export class PlayersService {

    constructor(
    @InjectRepository(Player)
        private playersRepository: Repository<Player>,
        private readonly als: AsyncLocalStorage<AuthTokenStore>,
    ) {}

    async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const username = createPlayerDto.username || this.generateUsername()

        const existingPlayer = await this.playersRepository.findOneBy({ username })
        if (existingPlayer) {
            throw new BadRequestException({ username: 'username already exists' })
        }

        const player = this.playersRepository.create({
            username,
        })

        return await this.playersRepository.save(player)
    }

    async findAll(): Promise<Player[]> {
        return this.playersRepository.find({ relations: { game: true } } )
    }

    async findOne(id: string): Promise<Player> {
        const player = await this.playersRepository.findOne({
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

    async getCurrentPlayer() {
        const userId = this.als.getStore()?.userId
        if (!userId) {
            throw new NotFoundException()
        }

        return await this.playersRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        })
    }

    private generateUsername(): string {
        return `player_${(new Date()).getTime()}`
    }
}
