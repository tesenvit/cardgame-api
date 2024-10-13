import {
    Body,
    Controller,
    Post,
    Get,
    Res,
    UseGuards, Delete, Param,
} from '@nestjs/common'
import { Response } from 'express'

import { BaseController } from '@/modules/_base/base.controller'
import { CreateGameDto } from '@/modules/games/dto/create-game.dto'
import { GamesService } from '@/modules/games/games.service'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { JoinGameDto } from '@/modules/games/dto/join-game.dto'

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
