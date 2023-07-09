import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) {}

    async get(userId: string): Promise<IUser> {
        const user = await this.userModel.findById(userId).exec()

        if (!user) {
            throw new NotFoundException()
        }

        return user
    }

    async getAll(): Promise<IUser[]> {
        return this.userModel.find().exec()
    }

    async create(createUserDto: CreateUserDto): Promise<IUser> {
        // createdAt: new Date()
        const newUser = new this.userModel(createUserDto)
        return newUser.save()
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
}
