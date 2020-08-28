import { DomUtils } from "./domUtils";

class ClearAllInputs {
	clear(): void {
		DomUtils.clearInputs(["addTitleInput", "addCategoryInput", "addRatingInput", "addYearInput", "addActorsInput"]);
	}
}

export const clearAllInputs = new ClearAllInputs();
