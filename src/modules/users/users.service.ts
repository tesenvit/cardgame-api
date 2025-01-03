import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AsyncLocalStorage } from 'async_hooks'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { BadRequestException } from '@/common/exceptions/bad-request.exception'
import { User } from '@/modules/users/entities/user.entity'
import { Player } from '@/modules/players/entities/player.entity'
import { AuthTokenStore } from '@/modules/als/types/als.interface'
import { PlayersService } from '@/modules/players/players.service'
import { EmailExist } from '@/common/exceptions/errors'
import { Role } from '@/modules/auth/types/auth.constants'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly als: AsyncLocalStorage<AuthTokenStore>,
        private playersService: PlayersService,
    ) {}

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ email })
        return user || null
    }

    async findOne(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({
            where: { id },
        })

        return user || null
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async create(createUserDto: CreateUserDto, player: Player): Promise<User> {
        const exist = await this.usersRepository.findOneBy({ email: createUserDto.email })
        if (exist) {
            throw new BadRequestException(EmailExist)
        }

        const user = this.usersRepository.create({
            password: createUserDto.password,
            email: createUserDto.email,
            role: Role.USER,
            player,
        })

        return await this.usersRepository.save(user)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException()
        }

        await this.usersRepository.update(id, updateUserDto)

        return await this.usersRepository.findOneBy({ id })
    }

    async delete(id: string): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id })
        if (!user) {
            throw new NotFoundException()
        }

        await this.playersService.delete(user.player.id)
    }
}
