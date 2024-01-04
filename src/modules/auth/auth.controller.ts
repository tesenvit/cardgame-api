import {
    Controller,
    Post,
    Body,
    Res,
} from '@nestjs/common'
import { Response } from 'express'

import { BaseController } from '../base.controller'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController extends BaseController {

    constructor(
        private authService: AuthService
    ) {
        super()
    }

    @Post('register')
    async register(
        @Res() response,
        @Body() createUserDto: CreateUserDto
    ): Promise<Response> {
        await this.authService.register(createUserDto)
        return this.success(response)
    }

    @Post('login')
    async login(
        @Res() response,
        @Body() loginAuthDto: LoginAuthDto
    ): Promise<Response> {
        const token = await this.authService.login(loginAuthDto)
        return this.result(response, token)
    }
}
