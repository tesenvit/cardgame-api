import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { IUser } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ValidateException } from '../../common/exceptions/validate.exception'
import { User } from './entities/user.entity'
import { AsyncLocalStorage } from 'async_hooks'
import { AuthTokenStore } from '../als/interfaces/als.interface'
import { PlayersService } from '../players/players.service'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly als: AsyncLocalStorage<AuthTokenStore>,
        private playersService: PlayersService,
    ) {}

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ email })

        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                id,
            },
            relations: {
                player: true,
            },
        })

        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOneBy({ email: createUserDto.email })
        if (existingUser) {
            throw new ValidateException({ email: 'email address already exists' })
        }

        const user = this.usersRepository.create({
            password: createUserDto.password,
            email: createUserDto.email,
        })

        const player = await this.playersService.create({
            username: createUserDto.username || null,
        })

        user.player = player
        player.user = user

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
