import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type GameDocument = HydratedDocument<Game>

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Game {

    @Prop({
        required: true,
    })
    title: string

    @Prop({
        required: true,
    })
    password: string

    @Prop({
        required: true,
    })
    players: string[]

    @Prop({
        required: true,
    })
    status: string

    @Prop({
        required: true,
    })
    owner: string
}

export const GameSchema = SchemaFactory.createForClass(Game)
