import {
    IsString,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator'

export class CreateGameDto {

    @IsString()
    @MaxLength(32)
    @MinLength(3)
    readonly title: string

    @IsOptional()
    @MaxLength(32)
    @IsString()
    readonly password: string
}
