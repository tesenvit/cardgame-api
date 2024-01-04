import {
    HttpException,
    INestApplication,
    ValidationError,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common'

import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { ValidateException } from './common/exceptions/validate.exception'

export default (app: INestApplication): void => {

    app.setGlobalPrefix('api')

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    })

    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []): HttpException => {
            const errors = validationErrors.reduce((accumulator, error) => {
                const firstErrorMessage = Object.values(error.constraints)[0]
                accumulator[error.property] = firstErrorMessage.replace(`${error.property} `, '')
                return accumulator
            }, {})

            return new ValidateException(errors)
        },
    }))

    app.useGlobalFilters(new HttpExceptionFilter())
}
