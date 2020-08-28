import { NoEmptyInputRule } from "./no-empty-input-rule.js";
import { InputActorsRule, InputRatingRule, InputTitleRule, InputYearFourDigitsRule, InputYearRangeRule, InputRatingRangeRule} from './input-content-rules.js';

interface Field {
    fieldId:string;
    errorId:string;
    rules:Array<any>;
    inputOk:boolean
}
export class FieldRules {
    title: Required<Field>;
    year:Required<Field>;
    category:Required<Field>;
    rating:Required<Field>;
    actors:Required<Field>;
    constructor (){
        this.title = {
            fieldId:'addTitleInput',
            errorId: 'errorLabelTitle',
            rules:[new NoEmptyInputRule(), new InputTitleRule()],
            inputOk:false
        };
        this.year = {
            fieldId: 'addYearInput',
            errorId: 'errorLabelYear',
            rules: [new NoEmptyInputRule(), new InputYearFourDigitsRule(), new InputYearRangeRule()],
            inputOk:false,
        }
        this.category = {
            fieldId: 'addCategoryInput',
            errorId: 'errorLabelCategory',
            rules: [new NoEmptyInputRule()],
            inputOk:false,
        }
        this.rating = {
            fieldId: 'addRatingInput',
            errorId: 'errorLabelRating',
            rules: [new NoEmptyInputRule(), new InputRatingRule(), new InputRatingRangeRule()],
            inputOk: false,
        }
        this.actors = {
            fieldId: 'addActorsInput',
            errorId: 'errorLabelActors',
            rules: [new NoEmptyInputRule(), new InputActorsRule()],
            inputOk: false,
        }

    }
}
