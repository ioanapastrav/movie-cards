import {ValidationResult} from './validation-result.js';

export class InputTitleRule {
    isValid (value){
        return /^[a-zA-Z0-9_]{1,20}$/.test(value)
        ? new ValidationResult(true) 
        : new ValidationResult(false, 'The title should contain letters and numbers and should be maximum 20 characters long');
      }
    }

export class InputYearFourDigitsRule {
    isValid (value){
        return /^\d{1,4}/.test(value)
        ? new ValidationResult(true)
        : new ValidationResult(false, 'Please enter a valid year (1900-2020).');
    }
}

export class InputYearRangeRule {
    isValid(value){
        return value < 2021 && value > 1900
        ?  new ValidationResult(true)
        : new ValidationResult(false, 'The year should be between 1900 and 2020.');
    }
}

export class InputRatingRule {
    isValid (value) {
        return /^\d+/.test(value)
        ? new ValidationResult(true)
        : new ValidationResult(false, 'The rating should be composed only of digits.');
    }
}
export class InputRatingRangeRule {
    isValid (value) {
        return value > 0 && value <11
        ? new ValidationResult(true)
        : new ValidationResult(false, 'The rating should be between 1 and 10.');
    }
}
export class InputActorsRule {
    isValid (value){
        return /^([a-zA-Z]+\s[a-zA-Z]+,{1}\s)*([a-zA-Z]+\s[a-zA-Z]+){1}$/.test(value)
        ? new ValidationResult(true)
        : new ValidationResult(false, 'Please constrain to the format: Firstname Lastname, Firstname Lastname');
    }
}