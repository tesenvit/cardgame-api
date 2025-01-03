import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class MatchFieldsValidator implements ValidatorConstraintInterface {
  validate(value: string | number, args: ValidationArguments): boolean {
    const [relatedFieldName] = args.constraints
    const relatedValue = (args.object as any)[relatedFieldName]
    return value === relatedValue
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedFieldName] = args.constraints
    return `${args.property} must match ${relatedFieldName}`
  }
}