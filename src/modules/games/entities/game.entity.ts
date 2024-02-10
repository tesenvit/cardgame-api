import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'

import { Player } from '../../players/entities/player.entity'

@Entity()
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    password: string

    @OneToMany(
        () => Player,
        player => player.game,
        {
            eager: true,
        }
    )
    players: Player[]

    @Column()
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
