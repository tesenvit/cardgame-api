import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'

import { AuthService } from '../auth.service'
import { IUser } from '../../users/interfaces/user.interface'
import { UsersService } from '../../users/users.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService: AuthService
    ) {
        super({
            usernameField: UsersService.EMAIL_FIELD,
        })
    }

    public async validate(email: string, password: string): Promise<IUser | null> {
        const user = await this.authService.validateUser(email, password)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
