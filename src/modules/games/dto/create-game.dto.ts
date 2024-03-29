import {
    IsString,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator'

import { GAME_PASSWORD_MAX_LENGTH } from '../types/game.constants'

export class CreateGameDto {

    @IsString()
    @MaxLength(32)
    @MinLength(3)
    readonly title: string

    @IsOptional()
    @MaxLength(GAME_PASSWORD_MAX_LENGTH)
    @IsString()
    readonly password: string
}
