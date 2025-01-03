import { registerDecorator, ValidationOptions } from 'class-validator'
import { MatchFieldsValidator } from '@/common/validators/match-fields.validator'
export function Match(field: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [field],
      validator: MatchFieldsValidator,
    })
  }
}