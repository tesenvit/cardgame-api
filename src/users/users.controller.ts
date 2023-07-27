import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Res,
    Param,
    HttpStatus,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/:id')
    async getStudent(@Res() response, @Param('id') userId: string) {
        const user = await this.userService.get(userId)

        return response.status(HttpStatus.OK).json({
            message: 'Student found successfully',
            user,
        })
    }

    @Get()
    async getAll(@Res() response) {
        const data = await this.userService.getAll()

        return response.status(HttpStatus.OK).json({
            data,
        })
    }

    @Post()
    async createStudent(@Res() response, @Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto)

        return response.status(HttpStatus.CREATED).json({
            message: 'User has been created successfully',
        })
    }

    @Put('/:id')
    async updateStudent(
        @Res() response,
        @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        const user = await this.userService.update(userId, updateUserDto)

        return response.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user,
        })
    }

    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') userId: string) {
        await this.userService.delete(userId)

        return response.status(HttpStatus.OK).json({
            message: 'User deleted successfully',
        })
    }
}
