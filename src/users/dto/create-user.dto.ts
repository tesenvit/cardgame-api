import {
    IsNotEmpty,
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator'

export class CreateUserDto {

    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    readonly username: string

    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string
}
