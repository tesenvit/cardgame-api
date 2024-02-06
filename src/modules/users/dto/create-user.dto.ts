import {
    IsNotEmpty,
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsStrongPassword,
    IsOptional,
} from 'class-validator'

import {
    PLAYER_USERNAME_MIN_LENGTH,
    PLAYER_USERNAME_MAX_LENGTH,
} from '../../players/types/players.constants'

export class CreateUserDto {

    @IsOptional()
    @MinLength(PLAYER_USERNAME_MIN_LENGTH)
    @MaxLength(PLAYER_USERNAME_MAX_LENGTH)
    @IsString()
    @IsNotEmpty()
    readonly username: string

    @IsStrongPassword({
        minLength: 5,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    })
    @IsNotEmpty()
    readonly password: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string
}
