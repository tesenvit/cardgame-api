import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { LoginAuthDto } from '../dto/login-auth.dto'
import { ValidateException } from '../../../common/exceptions/validate.exception'
import validationErrorHandler from '../../../common/helpers/validation/validation-error-handler'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()

        const errors = await validate(plainToClass(LoginAuthDto, request.body))
        if (errors.length) {
            throw new ValidateException(validationErrorHandler(errors))
        }

        return super.canActivate(context) as boolean | Promise<boolean>
    }
}
