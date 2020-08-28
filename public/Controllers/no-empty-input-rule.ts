import {ValidationResult} from './validation-result.js';

export  class NoEmptyInputRule {
    isValid (value:string){
        return value
             ? new ValidationResult(true)
             : new ValidationResult(false, 'This input should not be empty!');
    }
}


