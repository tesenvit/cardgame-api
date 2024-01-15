import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'

import { User } from '../../users/models/user.entity'

@Entity()
export class Game {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    title: string

    @Column()
    password: string

    @OneToMany(() => User, user => user.game)
    users: User[]

    @Column()
    status: string

    @Column()
    owner: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
