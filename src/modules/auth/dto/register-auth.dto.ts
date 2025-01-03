import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator'

import { Match } from '@/common/decorators/match.decorator'
import {
  PLAYER_USERNAME_MAX_LENGTH,
  PLAYER_USERNAME_MIN_LENGTH,
} from '@/modules/players/types/players.constants'

export class RegisterAuthDto {

  @MinLength(PLAYER_USERNAME_MIN_LENGTH)
  @MaxLength(PLAYER_USERNAME_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  readonly username: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsStrongPassword({
    minLength: 5,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  @IsNotEmpty()
  readonly password: string

  @Match('password', { message: 'Passwords do not match' })
  readonly confirmPassword: string
}
