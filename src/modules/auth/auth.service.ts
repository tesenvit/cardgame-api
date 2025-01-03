import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { IToken } from '@/modules/auth/types/auth.interface'
import { UsersService } from '@/modules/users/users.service'
import { IUser } from '@/modules/users/types/user.interface'
import { User } from '@/modules/users/entities/user.entity'
import { BadRequestException } from '@/common/exceptions/bad-request.exception'
import { EmailNotFound, PasswordIncorrect } from '@/common/exceptions/errors'
import { PlayersService } from '@/modules/players/players.service'
import { RegisterAuthDto } from '@/modules/auth/dto/register-auth.dto'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private playersService: PlayersService,
        private jwtService: JwtService,
    ) {}

    public async validateUser(email: string, password: string): Promise<User> {
        const user: User | null = await this.usersService.findOneByEmail(email)
        if (!user) {
            throw new BadRequestException(EmailNotFound)
        }

        const passwordCompared: boolean = await bcrypt.compare(password, user.password)
        if (!passwordCompared) {
            throw new BadRequestException(PasswordIncorrect)
        }

        return user
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

    async register(registerAuthDto: RegisterAuthDto): Promise<void> {
        const { username, ...userData } = registerAuthDto

        const player = await this.playersService.create({ username })

        await this.usersService.create(userData, player)
    }
}
