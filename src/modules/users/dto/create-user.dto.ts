import {
    IsNotEmpty,
    IsEmail,
    IsString,
    IsStrongPassword,
} from 'class-validator'

export class CreateUserDto {

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
}
