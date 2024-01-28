import {
    Controller,
    Post,
    Body,
    Res,
    Req,
    UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { BaseController } from '../base.controller'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

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
    @UseGuards(LocalAuthGuard)
    async login(
        @Res() response,
        @Req() request
    ): Promise<Response> {
        const token = await this.authService.login(request.user)
        return this.result(response, token)
    }
}
