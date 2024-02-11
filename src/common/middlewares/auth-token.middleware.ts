import { Injectable, NestMiddleware } from '@nestjs/common'
import { AsyncLocalStorage } from 'async_hooks'
import { Response, Request } from 'express'
import { JwtService } from '@nestjs/jwt'

import { AuthTokenStore } from '../../modules/als/interfaces/als.interface'

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private readonly als: AsyncLocalStorage<AuthTokenStore>,
        private readonly jwtService: JwtService,
    ) {}

    use(request: Request, response: Response, next: () => void) {
        const store = {
            authUserToken: '',
            userId: '',
            userEmail: '',
        }

        if (request.headers.authorization) {
            const token = request.headers.authorization.replace('Bearer ', '')
            const data = this.jwtService.decode(token)

            store.authUserToken = token
            store.userId = data.sub
            store.userEmail = data.email
        }

        this.als.run(store, () => {
            next()
        })
    }
}
