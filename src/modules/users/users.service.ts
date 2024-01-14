import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'

import { IUser } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ValidateException } from '../../common/exceptions/validate.exception'

import { User } from './models/user.entity'

@Injectable()
export class UsersService {

    static readonly EMAIL_FIELD = 'email'
    static readonly ID_FIELD = 'id'

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async getByEmail(email: string, includeHidden = false): Promise<IUser> {
        const user = this.getByField(UsersService.EMAIL_FIELD, email, includeHidden)

        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getById(id: number, includeHidden = false): Promise<IUser> {
        const user = this.getByField(UsersService.ID_FIELD, id, includeHidden)

        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getAll(): Promise<IUser[]> {
        return this.usersRepository.find()
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const doesUserExist = await this.usersRepository.findOneBy({ email: createUserDto.email })
        if (doesUserExist) {
            throw new ValidateException({ email: 'email address already exists' })
        }

        const user = new User()
        user.username =  createUserDto.username
        user.password = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt())
        user.email = createUserDto.email

        return await this.usersRepository.save(user)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<IUser> {
        const user: IUser = await this.usersRepository.findOneBy({ id })

        if (!user) {
            throw new NotFoundException()
        }

        await this.usersRepository.update(id, updateUserDto)

        return await this.usersRepository.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        const deletedUser = await this.usersRepository.findOneBy({ id })

        if (!deletedUser) {
            throw new NotFoundException()
        }

        await this.usersRepository.delete(id)
    }

    private async getByField(field: string, value: number | string, includeHidden = false) {
        const options: any = {
            where: {
                [field]: value,
            },
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
