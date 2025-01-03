import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    ManyToMany,
    JoinColumn,
} from 'typeorm'

import { User } from '@/modules/users/entities/user.entity'
import { Game } from '@/modules/games/entities/game.entity'

@Entity()
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true,
    })
    username: string

    @Column({
        default: 0,
    })
    rating: number

    @OneToOne(() => User, user => user.player, { cascade: true })
    @JoinColumn()
    user: User

    @ManyToMany(() => Game, (game) => game.players)
    @JoinColumn()
    games: Game

    @ManyToOne(() => Game, (game) => game.players)
    currentGame: Game


}
