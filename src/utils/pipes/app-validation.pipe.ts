import {
    ValidationPipe,
    BadRequestException,
    ValidationError,
} from '@nestjs/common'

export class AppValidationPipe extends ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                return new BadRequestException(validationErrors.map(error => {
                    const firstErrorMessage = Object.values(error.constraints)[0]
                    return {
                        [error.property]: firstErrorMessage.replace(`${error.property} `, ''),
                    }
                }))
            },
        })
    }
}

