import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { IUser, IUserWithCredentials } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDocument } from './models/user.schema'
import { ValidateException } from '../../common/exceptions/validate.exception'

@Injectable()
export class UsersService {

    static readonly EMAIL_FIELD = 'email'
    static readonly ID_FIELD = 'id'

    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>
    ) {}

    async getByEmail(email: string): Promise<IUserWithCredentials> {
        const user = await this.getUserByEmail(email)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getById(id: string): Promise<IUserWithCredentials> {
        const user = await this.getUserById(id)
        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getAll(): Promise<IUser[]> {
        return this.userModel.find().lean()
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const doesUserExist = await this.getUserByEmail(createUserDto.email)
        if (doesUserExist) {
            throw new ValidateException({ [UsersService.EMAIL_FIELD]: 'email address already exists' })
        }

        const user = new this.userModel(createUserDto)
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)

        return user.save()
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })

        if (!existingUser) {
            throw new NotFoundException()
        }

        return existingUser
    }

    async delete(userId: string): Promise<void> {
        const deletedUser = await this.userModel.findByIdAndDelete(userId)

        if (!deletedUser) {
            throw new NotFoundException()
        }
    }

    private async getUserByEmail(email: string): Promise<IUserWithCredentials | null> {
        return this.userModel.findOne({ email }).lean()
    }

    private async getUserById(id: string): Promise<IUserWithCredentials | null> {
        return this.userModel.findOne({ _id: id }).lean()
    }
}
