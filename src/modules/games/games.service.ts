import { Injectable } from '@nestjs/common'
import { CreateGameDto } from './dto/create-game.dto'
import { IGame } from './interfaces/game.interface'

@Injectable()
export class GamesService {

    create(createGameDto: CreateGameDto) {
        return ''
    }
}
