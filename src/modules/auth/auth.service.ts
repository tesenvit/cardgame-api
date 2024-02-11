import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { IToken } from './interfaces/token.interface'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { IUser } from '../users/interfaces/user.interface'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOneByEmail(email, true)
        return user && await bcrypt.compare(password, user.password) ? user : null
    }

    async login(user: IUser): Promise<IToken> {
        const payload = {
            sub: user.id,
            email: user.email,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(createUserDto: CreateUserDto): Promise<void> {
        await this.usersService.create(createUserDto)
    }
}
