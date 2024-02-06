import {
    Controller,
    Get,
    Body,
    Param,
    Delete,
    Res,
    UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { PlayersService } from './players.service'
import { UpdatePlayerDto } from './dto/update-player.dto'
import { BaseController } from '../base.controller'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'


@Controller('players')
@UseGuards(JwtAuthGuard)
export class PlayersController extends BaseController {

    constructor(
        private readonly playersService: PlayersService
    ) {
        super()
    }

    @Get()
    async findAll(
        @Res() response
    ): Promise<Response> {
        const players = await this.playersService.findAll()
        return this.result(response, players)
    }

    @Get(':id')
    async findOne(
        @Res() response,
        @Param('id') id: string
    ) {
        const player = await this.playersService.findOne(id)
        return this.result(response, player)
    }

    async update(
        @Res() response,
        @Param('id') id: string,
        @Body() updatePlayerDto: UpdatePlayerDto
    ): Promise<Response> {
        const player = await this.playersService.update(id, updatePlayerDto)
        return this.result(response, player)
    }

    @Delete('/:id')
    async delete(
        @Res() response,
        @Param('id') id: string
    ): Promise<Response> {
        await this.playersService.delete(id)
        return this.success(response)
    }
}
