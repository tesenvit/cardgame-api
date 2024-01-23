import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AsyncLocalStorage } from 'async_hooks'
import { JwtService } from '@nestjs/jwt'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './models/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [
        AsyncLocalStorage,
        UsersService,
        JwtService,
    ],
    exports: [
        AsyncLocalStorage,
        UsersService,
    ],
})
export class UsersModule {}
