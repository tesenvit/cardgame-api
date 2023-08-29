import {
    IsNotEmpty,
    IsEmail,
    IsArray,
    IsNumber,
} from 'class-validator'

export class LocalAuthDto {

    @IsNotEmpty()
    @IsEmail()
    @IsNumber()
    readonly email: string

    @IsNotEmpty()
    @IsArray()
    readonly password: string
}
