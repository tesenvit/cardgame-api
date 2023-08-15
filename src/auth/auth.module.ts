import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'c784de9f4dbaa7cfed39befd60a1038a4ab23d6f3e53c22fa554fb1fe6352d93',
            signOptions: {
                expiresIn: '3d',
            },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
