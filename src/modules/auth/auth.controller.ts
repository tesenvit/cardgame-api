import {
    Controller,
    Req,
    Post,
    UseGuards,
    Body,
} from '@nestjs/common'

import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        await this.authService.register(createUserDto)
        console.log('d');
        return true
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request): Promise<object> {
        return this.authService.login(request.user)
    }
}
