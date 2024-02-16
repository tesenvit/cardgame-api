import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { IToken } from './types/token.interface'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { IUser } from '../users/types/user.interface'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOneByEmail(email)
        return user && await bcrypt.compare(password, user.password) ? user : null
    }

    async login(user: IUser): Promise<IToken> {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(createUserDto: CreateUserDto): Promise<void> {
        await this.usersService.create(createUserDto)
    }
}
