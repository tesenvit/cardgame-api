import {
    HttpException,
    INestApplication,
    ValidationError,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common'

import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { ValidateException } from './common/exceptions/validate.exception'
import validationErrorHandler from './common/helpers/validation/validation-error-handler'

export default (app: INestApplication): void => {

    app.setGlobalPrefix('api')

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    })

    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []): HttpException => {
            return new ValidateException(validationErrorHandler(validationErrors))
        },
    }))

    app.useGlobalFilters(new HttpExceptionFilter())
}
