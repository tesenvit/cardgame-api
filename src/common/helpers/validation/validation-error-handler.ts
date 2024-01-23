import { ValidationError } from '@nestjs/common'

export default (validationErrors: ValidationError[] = []) => {
    return validationErrors.reduce((accumulator, error) => {
        const firstErrorMessage = Object.values(error.constraints)[0]
        accumulator[error.property] = firstErrorMessage.replace(`${error.property} `, '')
        return accumulator
    }, {})
}
