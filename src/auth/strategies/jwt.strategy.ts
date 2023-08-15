import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'c784de9f4dbaa7cfed39befd60a1038a4ab23d6f3e53c22fa554fb1fe6352d93',
        })
    }

    public async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
        }
    }
}
