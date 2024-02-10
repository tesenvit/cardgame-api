import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Game } from '../../games/entities/game.entity'

@Entity()
export class Player {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true,
    })
    username: string

    @OneToOne(
        () => User,
        user => user.player,
        {
            onDelete: 'CASCADE',
        }
    )
    user: User

    @ManyToOne(
        () => Game,
        game => game.players,
        {
            onDelete: 'SET NULL',
        }
    )
    @JoinColumn()
    game: Game
}
