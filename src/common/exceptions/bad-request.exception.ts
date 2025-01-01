import { HttpException, HttpStatus } from '@nestjs/common'

export class BadRequestException extends HttpException {

    constructor(errors: object | []) {
        errors = Array.isArray(errors) ? errors : [errors]
        super({ message: 'Bad Request', errors }, HttpStatus.BAD_REQUEST)
    }
}
