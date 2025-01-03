import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AsyncLocalStorage } from 'async_hooks'

import { CreatePlayerDto } from '@/modules/players/dto/create-player.dto'
import { UpdatePlayerDto } from '@/modules/players/dto/update-player.dto'
import { Player } from '@/modules/players/entities/player.entity'
import { BadRequestException } from '@/common/exceptions/bad-request.exception'
import { AuthTokenStore } from '@/modules/als/types/als.interface'
import { UsernameExist } from '@/common/exceptions/errors'

@Injectable()
export class PlayersService {

    constructor(
    @InjectRepository(Player)
        private playersRepository: Repository<Player>,
        private readonly als: AsyncLocalStorage<AuthTokenStore>,
    ) {}

    async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const { username } = createPlayerDto

        const existingPlayer = await this.playersRepository.findOneBy({ username })
        if (existingPlayer) {
            throw new BadRequestException(UsernameExist)
        }

        const player = this.playersRepository.create({
            username,
            rating: 0,
        })

        return await this.playersRepository.save(player)
    }

    async findAll(): Promise<Player[]> {
        return this.playersRepository.find({
            relations: {
                games: true,
                currentGame: true,
            },
        })
    }

    async findOne(id: string): Promise<Player | null> {
        const player = await this.playersRepository.findOne({
            where: {
                id,
            },
            relations: {
               user: true,
            },
        })

        return player || null
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

    generateUsername(): string {
        return `player_${(new Date()).getTime()}`
    }
}
