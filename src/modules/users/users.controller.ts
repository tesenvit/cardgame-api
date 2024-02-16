import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Res,
    Param,
    UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { BaseController } from '../base.controller'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../common/guards/role.guard'
import { Roles } from '../../common/decorators/role.decorator'
import { Role } from '../auth/types/auth.constants'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController extends BaseController {

    constructor(
        private readonly userService: UsersService
    ) {
        super()
    }

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    async findAll(
        @Res() response
    ): Promise<Response> {
        const users = await this.userService.findAll()
        return this.result(response, users)
    }

    @Get('/:id')
    async findOne(
        @Res() response,
        @Param('id') id: string
    ): Promise<Response> {
        const user = await this.userService.findOne(id)
        return this.result(response, user)
    }

    @Post()
    async create(
        @Res() response,
        @Body() createUserDto: CreateUserDto
    ) {
        const user = await this.userService.create(createUserDto)
        return this.result(response, user)
    }

    @Put('/:id')
    async update(
        @Res() response,
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<Response> {
        const user = await this.userService.update(id, updateUserDto)
        return this.result(response, user)
    }

    @Delete('/:id')
    async delete(
        @Res() response,
        @Param('id') id: string
    ): Promise<Response> {
        await this.userService.delete(id)
        return this.success(response)
    }
}
