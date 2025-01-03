import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm'

import { GameStatus } from '@/modules/games/types/game.constants'
import { Player } from '@/modules/players/entities/player.entity'

@Entity()
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    password: string

    @ManyToMany(() => Player, (player) => player.games)
    players: Player[]

    @Column({
        type: 'enum',
        enum: GameStatus,
    })
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
