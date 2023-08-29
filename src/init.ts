import {
    HttpException,
    INestApplication,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common'

import { HttpExceptionFilter } from './utils/exceptions/http-exception.filter'
import { ValidateException } from './utils/exceptions/validate.exception'

export default (app: INestApplication): void => {

    app.setGlobalPrefix('api')

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
