export class ValidationResult {
    isValid:boolean;
    errorMessage:string
    constructor (isValid:boolean, errorMessage?:string){
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
}

  