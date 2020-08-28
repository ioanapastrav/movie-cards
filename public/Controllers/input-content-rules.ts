import { ValidationResult } from './validation-result.js';

export class InputTitleRule {
    isValid (value:string){
        return /^[a-zA-Z0-9_]{1,20}$/.test(value)
        ? new ValidationResult(true) 
        : new ValidationResult(false, 'The title should contain letters and numbers and should be maximum 20 characters long');
      }
    }

export class InputYearFourDigitsRule {
    isValid (value:string){
        return /^\d{1,4}/.test(value)
        ? new ValidationResult(true)
        : new ValidationResult(false, 'Please enter a valid year (1900-2020).');
    }
}

export class InputYearRangeRule {
    isValid(value:string){
        return value as any as number < 2021 && value as any as number > 1900
        ?  new ValidationResult(true)
        : new ValidationResult(false, 'The year should be between 1900 and 2020.');
    }
}

export class InputRatingRule {
    isValid (value:string) {
        return /^\d+/.test(value)
        ? new ValidationResult(true)
        : new ValidationResult(false, 'The rating should be composed only of digits.');
    }
}
export class InputRatingRangeRule {
    isValid (value:string) {
        return value as any as number > 0 && value as any as number <11
        ? new ValidationResult(true)
        : new ValidationResult(false, 'The rating should be between 1 and 10.');
    }
}
export class InputActorsRule {
    isValid (value:string){
        return /^([a-zA-Z]+\s[a-zA-Z]+,{1}\s)*([a-zA-Z]+\s[a-zA-Z]+){1}$/.test(value)
        ? new ValidationResult(true)
        : new ValidationResult(false, 'Please constrain to the format: Firstname Lastname, Firstname Lastname');
    }
}