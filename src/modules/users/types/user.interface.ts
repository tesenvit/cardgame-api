import { Role } from '@/modules/auth/types/auth.constants'

export interface IUser  {
    readonly id: string
    readonly email: string
    readonly password?: string
    readonly role: Role
}
