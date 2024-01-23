import { Injectable, NestMiddleware } from '@nestjs/common'
import { AsyncLocalStorage } from 'async_hooks'
import { Response, Request } from 'express'

import { AuthTokenStore } from '../../modules/als/interfaces/als.interface'

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {

    constructor(
        private readonly als: AsyncLocalStorage<AuthTokenStore>
    ) {}

    use(request: Request, response: Response, next: () => void) {
        const token = request.headers.authorization || ''
        const store = {
            authUserToken: token.replace('Bearer ', ''),
        }
        this.als.run(store, () => {
            next()
        })
    }
}
