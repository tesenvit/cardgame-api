import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'
import {IUser, IUserWithCredentials} from '../users/interfaces/user.interface'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    public async validateUser(email: string, pass: string): Promise<IUser | null> {
        const user = await this.usersService.get(email, UsersService.EMAIL_FIELD)
        const isMatch = await bcrypt.compare(pass, user.password)
        if (isMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user
            return result
        }

        return null
    }

    public async login(user: IUser): Promise<object> {
        const payload = {
            email: user.email,
            sub: user.email,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    public async register(user: IUserWithCredentials): Promise<void> {
        await this.usersService.create(user)
    }
}
