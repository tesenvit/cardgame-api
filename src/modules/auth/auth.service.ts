import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { IToken } from './interfaces/token.interface'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { IUser } from '../users/interfaces/user.interface'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    public async validateUser(email: string, password: string): Promise<IUser | null> {
        const user = await this.usersService.getByEmail(email)
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(loginAuthDto: LoginAuthDto): Promise<IToken> {
        const payload = {
            email: loginAuthDto.email,
            sub: loginAuthDto.email,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(createUserDto: CreateUserDto): Promise<void> {
        await this.usersService.create(createUserDto)
    }
}
