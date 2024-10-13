import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { UnauthorizedException, Injectable } from '@nestjs/common'

import { AuthService } from '@/modules/auth/auth.service'
import { User } from '@/modules/users/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(
        private authService: AuthService
    ) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(email, password)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
