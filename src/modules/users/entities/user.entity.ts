import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

import { Player } from '../../players/entities/player.entity'
import { Role } from '../../auth/types/auth.constants'

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

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt())
    }
}
