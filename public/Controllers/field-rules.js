import { NoEmptyInputRule } from "./no-empty-input-rule.js";
import { InputActorsRule, InputRatingRule, InputTitleRule, InputYearFourDigitsRule, InputYearRangeRule, InputRatingRangeRule} from './input-content-rules.js';

export const fieldRules = {
    title: {
        fieldId: 'addTitleInput',
        errorId: 'errorLabelTitle',
        rules: [new NoEmptyInputRule(), new InputTitleRule()],
        inputOk:false,
    },
    year: {
        fieldId: 'addYearInput',
        errorId: 'errorLabelYear',
        rules: [new NoEmptyInputRule(), new InputYearFourDigitsRule(), new InputYearRangeRule()],
        inputOk:false,
    },
    category: {
        fieldId: 'addCategoryInput',
        errorId: 'errorLabelCategory',
        rules: [new NoEmptyInputRule()],
        inputOk:false,
    },
    rating: {
        fieldId: 'addRatingInput',
        errorId: 'errorLabelRating',
        rules: [new NoEmptyInputRule(), new InputRatingRule(), new InputRatingRangeRule()],
        inputOk: false,
    },
    actors: {
        fieldId: 'addActorsInput',
        errorId: 'errorLabelActors',
        rules: [new NoEmptyInputRule(), new InputActorsRule()],
        inputOk: false,
    }
}