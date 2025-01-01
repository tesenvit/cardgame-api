import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator'

export class LoginAuthDto {

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}
