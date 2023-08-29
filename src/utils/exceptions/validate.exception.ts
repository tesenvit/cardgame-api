import {HttpException, HttpStatus} from '@nestjs/common'

export class ValidateException extends HttpException {

    constructor(errors: object) {
        super({
            message: 'Bad Request',
            errors,
        }, HttpStatus.BAD_REQUEST)
    }
}
