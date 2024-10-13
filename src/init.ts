import {
    HttpException,
    INestApplication,
    ValidationError,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common'

import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { BadRequestException } from './common/exceptions/bad-request.exception'
import transformErrors from './common/helpers/validation-transform-errors'

export default (app: INestApplication): void => {

    app.setGlobalPrefix('api')

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    })

    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors: ValidationError[] = []): HttpException => {
            return new BadRequestException(transformErrors(errors))
        },
    }))

    app.useGlobalFilters(new HttpExceptionFilter())
}
