import {
    Controller,
    Req,
    Post,
    UseGuards,
    Body,
    Res,
} from '@nestjs/common'
import { Response } from 'express'

import { BaseController } from '../base.controller'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

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
        @Req() request,
        @Res() response,
    ): Promise<Response> {
        console.log('controller login')
        const token = await this.authService.login(request.user)
        return this.result(response, token)
    }
}
