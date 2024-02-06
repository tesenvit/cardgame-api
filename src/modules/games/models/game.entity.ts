import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'

import { User } from '../../users/entities/user.entity'

@Entity()
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    password: string

    @OneToMany(() => User, user => user.game)
    users: User[]

    @Column()
    status: string

    @Column()
    owner: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
