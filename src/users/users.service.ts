import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    // async create(createUserDto: CreateUserDto): Promise<User> {
    //     const createdCat = new this.userModel(CreateUserDto)
    //     return createdCat.save()
    // }
}
