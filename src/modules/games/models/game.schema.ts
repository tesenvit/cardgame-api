import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type GameDocument = HydratedDocument<Game>

@Schema({
    versionKey: false,
})
export class Game {

    title: string

    password: string

    players: string[]

    status: string
}

export const GameSchema = SchemaFactory.createForClass(Game)
