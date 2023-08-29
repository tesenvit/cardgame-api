import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { IUser, IUserWithCredentials } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDocument } from './schemas/user.schema'
import { ValidateException } from '../../utils/exceptions/validate.exception'

@Injectable()
export class UsersService {

    static readonly EMAIL_FIELD = 'email'
    static readonly ID_FIELD = 'id'

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>
    ) {}

    async get(id: string, field = UsersService.ID_FIELD): Promise<IUserWithCredentials> {
        const user = (field === UsersService.EMAIL_FIELD) ? await this.getByEmail(id) : await this.getById(id)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getAll(): Promise<IUser[]> {
        return this.userModel.find().exec()
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const doesUserExist = await this.getByEmail(createUserDto.email)
        if (doesUserExist) {
            throw new ValidateException({[UsersService.EMAIL_FIELD]: 'email address already exists'})
        }

        const user = new this.userModel(createUserDto)
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        user.createdAt = new Date().getTime()

        return user.save()
    }

    async update(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true })

        if (!existingUser) {
            throw new NotFoundException()
        }

        return existingUser
    }

    async delete(userId: string): Promise<IUser> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId)

        if (!deletedUser) {
            throw new NotFoundException()
        }

        return deletedUser
    }

    private async getById(userId: string): Promise<IUserWithCredentials> {
        return this.userModel.findById(userId).exec()
    }

    private async getByEmail(email: string): Promise<IUserWithCredentials> {
        return this.userModel.findOne({email}).exec()
    }
}
