import { Controller, Get, Res, HttpStatus} from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    async findAll(@Res() response) {
        const data = await this.userService.findAll()

        return response.status(HttpStatus.OK).json({
            data
        })
    }
}
