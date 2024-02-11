import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'

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

    static readonly EMAIL_FIELD = 'email'
    static readonly ID_FIELD = 'id'

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly als: AsyncLocalStorage<AuthTokenStore>,
        private playersService: PlayersService
    ) {}

    async findOneByEmail(email: string, includeHidden = false): Promise<User> {
        const user = this.getByField(UsersService.EMAIL_FIELD, email, includeHidden)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async findOne(id: string, includeHidden = false): Promise<User> {
        const user = await this.getByField(UsersService.ID_FIELD, id, includeHidden)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getCurrentUser(): Promise<User> {
        const userId = this.als.getStore()?.userId
        if (!userId) {
            throw new NotFoundException()
        }

        return this.findOne(userId)
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOneBy({ email: createUserDto.email })
        if (existingUser) {
            throw new ValidateException({ email: 'email address already exists' })
        }

        const player = await this.playersService.create({
            username: createUserDto.username || null,
        })

        const user = new User()
        user.password = createUserDto.password
        user.email = createUserDto.email
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

    private async getByField(field: string, value: number | string, includeHidden = false) {
        const options: any = {
            where: {
                [field]: value,
            },
            players: true,
        }
        if (includeHidden) {
            options.select = this.getAllRepositoryCols()
        }

        return this.usersRepository.findOne(options)
    }

    private getAllRepositoryCols<T>(): (keyof T)[] {
        return (this.usersRepository.metadata.columns.map(col => col.propertyName) as (keyof T)[])
    }
}
