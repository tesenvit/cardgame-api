import {
    Body,
    Controller,
    Post,
    Get,
    Res,
    UseGuards, Delete, Param,
} from '@nestjs/common'

import { BaseController } from '../base.controller'
import { CreateGameDto } from './dto/create-game.dto'
import { GamesService } from './games.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { JoinGameDto } from './dto/join-game.dto'
import { Response } from 'express'

@Controller('games')
@UseGuards(JwtAuthGuard)
export class GamesController extends BaseController {

    constructor(
        private readonly gamesService: GamesService
    ) {
        super()
    }

    @Get()
    async getAll(
        @Res() response
    ): Promise<Response> {
        const games = await this.gamesService.findAll()
        return this.result(response, games)
    }

    @Post()
    async create(
        @Res() response,
        @Body() createGameDto: CreateGameDto,
    ) {
        const game = await this.gamesService.create(createGameDto)
        return this.result(response, game)
    }

    @Post('/join')
    async join(
        @Res() response,
        @Body() joinGameDto: JoinGameDto
    ) {
        await this.gamesService.join(joinGameDto)
        return this.success(response)
    }

    @Delete('/:id')
    async delete(
        @Res() response,
        @Param('id') id: string
    ): Promise<Response> {
        await this.gamesService.delete(id)
        return this.success(response)
    }
}
