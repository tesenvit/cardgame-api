import {
    IsNotEmpty, IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'

import {
    PLAYER_USERNAME_MIN_LENGTH,
    PLAYER_USERNAME_MAX_LENGTH,
} from '../types/players.constants'

export class CreatePlayerDto {

    @MinLength(PLAYER_USERNAME_MIN_LENGTH)
    @MaxLength(PLAYER_USERNAME_MAX_LENGTH)
    @IsString()
    @IsNotEmpty()
    readonly username: string
}
