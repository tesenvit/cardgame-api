import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

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
        return await this.authService.validateUser(email, password)
    }
}
