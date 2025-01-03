import {
    Controller,
    Get,
    Put,
    Delete,
    Body,
    Res,
    Param,
    UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { BaseController } from '@/modules/_base/base.controller'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { RolesGuard } from '@/common/guards/role.guard'
import { Roles } from '@/common/decorators/role.decorator'
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
        @Res() response: Response
    ): Promise<Response> {
        const users = await this.userService.findAll()
        return this.result(response, users)
    }

    @Get('/:id')
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    async findOne(
        @Res() response: Response,
        @Param('id') id: string
    ): Promise<Response> {
        const user = await this.userService.findOne(id)
        return this.result(response, user)
    }

    @Put('/:id')
    async update(
        @Res() response: Response,
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<Response> {
        const user = await this.userService.update(id, updateUserDto)
        return this.result(response, user)
    }

    @Delete('/:id')
    async delete(
        @Res() response: Response,
        @Param('id') id: string
    ): Promise<Response> {
        await this.userService.delete(id)
        return this.success(response)
    }
}
