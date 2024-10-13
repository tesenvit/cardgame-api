import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { IToken } from '@/modules/auth/types/token.interface'
import { UsersService } from '@/modules/users/users.service'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { IUser } from '@/modules/users/types/user.interface'
import { User } from '@/modules/users/entities/user.entity'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async validateUser(email: string, password: string): Promise<User | null> {
        const user: User = await this.usersService.findOneByEmail(email)
        return user && await bcrypt.compare(password, user.password) ? user : null
    }

    async login(user: IUser): Promise<IToken> {
        return {
            access_token: this.jwtService.sign({
                sub: user.id,
                email: user.email,
                role: user.role,
            }),
        }
    }

    async register(createUserDto: CreateUserDto): Promise<void> {
        await this.usersService.create(createUserDto)
    }
}
