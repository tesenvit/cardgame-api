import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from '@/modules/auth/auth.service'
import { UsersModule } from '@/modules/users/users.module'
import { PlayersModule } from '@/modules/players/players.module'
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy'
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy'
import { AuthController } from '@/modules/auth/auth.controller'

@Module({
    imports: [
        UsersModule,
        PlayersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get<string>('jwt.expire'),
                },
            }),
        }),
    ],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
