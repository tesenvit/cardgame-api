import { Body, Controller, Post, Res, UseGuards, Req } from '@nestjs/common'
import { BaseController } from '../base.controller'
import { CreateGameDto } from './dto/create-game.dto'
import { GamesService } from './games.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('games')
export class GamesController extends BaseController {

    constructor(
        private readonly gameService: GamesService
    ) {
        super()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @Res() response,
        @Body() createGameDto: CreateGameDto,
    ) {
        const game = await this.gameService.create(createGameDto)
        return this.result(response, game)
    }
}
