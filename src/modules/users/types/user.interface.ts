import { Role } from '../../auth/types/auth.constants'

export interface IUser  {
    readonly id: number
    readonly username: string
    readonly email: string
    readonly password?: string
    readonly role: Role
}
