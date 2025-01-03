import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

import { Role } from '@/modules/auth/types/auth.constants'
import { Player } from '@/modules/players/entities/player.entity'

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


    @OneToOne(() => Player, player => player.user, { eager: true })
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
