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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('users')
export class UsersController extends BaseController {

    constructor(
        private readonly userService: UsersService
    ) {
        super()
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    async get(
        @Res() response,
        @Param('id') id: number
    ): Promise<Response> {
        const user = await this.userService.getById(Number(id))
        return this.result(response, user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(
        @Res() response
    ): Promise<Response> {
        const users = await this.userService.getAll()
        return this.result(response, users)
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
        @Param('id') userId: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<Response> {
        const user = await this.userService.update(Number(userId), updateUserDto)
        return this.result(response, user)
    }

    @Delete('/:id')
    async delete(
        @Res() response,
        @Param('id') id: number
    ): Promise<Response> {
        await this.userService.delete(Number(id))
        return this.success(response)
    }
}
