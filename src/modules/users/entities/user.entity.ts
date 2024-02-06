import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import { Player } from '../../players/entities/player.entity'
import { Game } from '../../games/models/game.entity'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    password: string

    @Column({
        unique: true,
    })
    email: string

    @OneToOne(
        () => Player,
        player => player.user,
        {
            eager: true,
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn()
    player: Player

    @ManyToOne(
        () => Game,
        game => game.users,
    )
    game: Game

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
