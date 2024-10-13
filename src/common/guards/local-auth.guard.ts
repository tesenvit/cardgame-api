import {
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { LoginAuthDto } from '@/modules/auth/dto/login-auth.dto'
import { BadRequestException } from '@/common/exceptions/bad-request.exception'
import transformErrors from '@/common/helpers/validation-transform-errors'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const errors = await validate(plainToClass(LoginAuthDto, request.body))
    if (errors.length) {
      throw new BadRequestException(transformErrors(errors))
    }

    return super.canActivate(context) as boolean | Promise<boolean>
  }
}
