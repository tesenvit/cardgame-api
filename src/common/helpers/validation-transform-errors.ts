import { ValidationError } from '@nestjs/common'
import capitalize from '@/common/helpers/capitalize'

interface IFormattedValidationErrors {
    path: string
    code: string
    message: string
}
export default (validationErrors: ValidationError[] = []): IFormattedValidationErrors[] => {
  return validationErrors.map(({ property, constraints }) => {
      return {
          path: property,
          code: Object.keys(constraints)[0],
          message: capitalize(Object.values(constraints)[0]),
      }
  })
}
