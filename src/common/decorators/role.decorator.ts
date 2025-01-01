import { SetMetadata } from '@nestjs/common'
import { Role, ROLES_KEY } from '@/modules/auth/types/auth.constants'

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
