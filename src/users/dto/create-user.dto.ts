import {
    IsNotEmpty,
    IsEmail,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    readonly password: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
}
