import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator'

export class LoginAuthDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}
