import {
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator'

import { GAME_PASSWORD_MAX_LENGTH } from '../types/game.constants'

export class JoinGameDto {

    @IsString()
    readonly gameId: string

    @IsOptional()
    @MaxLength(GAME_PASSWORD_MAX_LENGTH)
    @IsString()
    readonly password: string
}
