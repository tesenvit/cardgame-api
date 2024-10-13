import {
    Controller,
    Post,
    Body,
    Res,
    Req,
    UseGuards,
} from '@nestjs/common'
import { Response, Request } from 'express'

import { BaseController } from '@/modules/_base/base.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { LocalAuthGuard } from '@/common/guards/local-auth.guard'
import { User } from '@/modules/users/entities/user.entity'

@Controller('auth')
export class AuthController extends BaseController {

    constructor(
        private authService: AuthService
    ) {
        super()
    }

    @Post('register')
    async register(
        @Res() response: Response,
        @Body() createUserDto: CreateUserDto
    ): Promise<Response> {
        await this.authService.register(createUserDto)
        return this.success(response)
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(
        @Res() response: Response,
        @Req() request: Request
    ): Promise<Response> {
        const token = await this.authService.login(request.user as User)
        return this.result(response, token)
    }
}
