import {
    IsNotEmpty,
    IsEmail,
    IsString,
    MaxLength,
    IsStrongPassword,
} from 'class-validator'

export class CreateUserDto {

    @MaxLength(30)
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
