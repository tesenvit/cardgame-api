import {
    Controller,
    Request,
    Post,
    UseGuards,
} from '@nestjs/common'

import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Request() req) {
        await this.authService.register(req)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<object> {
        return this.authService.login(req.user)
    }
}
