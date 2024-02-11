import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { Player } from '../../players/entities/player.entity'

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
            cascade: true,
        }
    )
    @JoinColumn()
    player: Player

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
