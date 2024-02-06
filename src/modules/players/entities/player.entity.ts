import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

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
}
