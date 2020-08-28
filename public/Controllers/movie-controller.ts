import { searchService, resultBuilderService, tooltipServices, localStorageServices } from "../Services/create-services";
import { FieldRules } from "./field-rules";
import { clearAllInputs } from "../Services/remove-input-value";
import { SnackBar } from "../Services/snak-bar";
import { Results } from "../Model/results";
import { DomUtils } from "../Services/domUtils";

export class MovieController {
	constructor() {}
	clean() {
		let movieResults: HTMLElement = document.querySelector(".movieResults");
		if (!!movieResults) {
			movieResults.remove();
		}
		let noResultsMessage: HTMLElement = document.getElementById("noResultsMessage");
		if (!!noResultsMessage) {
			noResultsMessage.remove();
		}
		let favoriteMovies: HTMLElement = document.querySelector(".favoriteMovies");
		let child = favoriteMovies.lastElementChild;
		while (child) {
			favoriteMovies.removeChild(child);
			child = favoriteMovies.lastElementChild;
		}
	}
	async search(): Promise<void> {
		try {
			let title: string = (<HTMLInputElement>document.getElementById("searchTitleInput")).value;
			let year: number = ((<HTMLInputElement>document.getElementById("searchYearInput")).value as any) as number;
			let category: string = (<HTMLInputElement>document.getElementById("searchCategoryInput")).value;
			let rating: number = ((<HTMLInputElement>document.getElementById("searchRatingInput")).value as any) as number;
			let actors: string = (<HTMLInputElement>document.getElementById("searchActorsInput")).value;

			if (!title && !year && !category && !rating && !actors) {
				resultBuilderService.noResult();
			} else if (!title) {
				const results: Array<Results> = await searchService.search(year, rating, actors, category);
				console.log(results);
				if (results.length === 0) {
					resultBuilderService.noResult();
				} else {
					resultBuilderService.build([], results);
				}
			} else if (!year && !category && !rating && !actors) {
				let titleResults: Array<Results> = await searchService.searchTitle(title);

				if (titleResults.length === 0) {
					resultBuilderService.noResult();
				} else {
					resultBuilderService.build(titleResults, []);
				}
			} else {
				let titleResults = await searchService.searchTitle(title);
				const results = await searchService.search(year, rating, actors, category);

				resultBuilderService.build(titleResults, results);
			}

			DomUtils.clearInputs(["searchTitleInput", "searchYearInput", "searchCategoryInput", "searchRatingInput", "searchActorsInput"]);
		} catch (error) {
			console.log(error);
		}
	}
	// add() {
	//     let title:string = document.getElementById('addTitleInput').value;
	//     let category:string = document.getElementById('addCategoryInput').value;
	//     let rating:number = document.getElementById('addRatingInput').value as any as number;
	//     let year:number = document.getElementById('addYearInput').value as any as number;
	//     let actors:string = document.getElementById('addActorsInput').value;
	//     let fieldRules:any = new FieldRules();

	//     for (const fieldKey in fieldRules) {
	//         const fieldRule:any = fieldRules[fieldKey];
	//         const fieldValue:HTMLElement = document.getElementById(fieldRule.fieldId);
	//         const errorLabel:HTMLElement = document.getElementById(fieldRule.errorId);
	//         const input:HTMLElement = document.getElementById(fieldRule.fieldId);
	//         input.classList.remove('inputError');
	//         errorLabel.innerHTML = "";

	//         for (let i = 0; i < fieldRule.rules.length; i++) {
	//             let rule = fieldRule.rules[i];
	//             const validationResult = rule.isValid(fieldValue.value);

	//             if (validationResult.isValid) {
	//                 fieldRule.inputOk = true;
	//             }
	//             else {
	//                 const errorLabel = document.getElementById(fieldRule.errorId);
	//                 const input = document.getElementById(fieldRule.fieldId);
	//                 errorLabel.innerHTML = validationResult.errorMessage;
	//                 input.classList.add('inputError');
	//                 fieldRule.inputOk = false;
	//                 break;
	//             }

	//         }
	//     }
	//     let count = 0;
	//     for (const fieldKey in fieldRules) {
	//         const fieldRule = fieldRules[fieldKey];

	//         if (fieldRule.inputOk === true) {
	//             count = count + 1;
	//         }

	//     };
	//     if (count === 5) {
	//         const newMovie:any = new Movie(title, category, rating, year, actors);
	//         movies.push(newMovie);
	//         console.log(newMovie);
	//         let snackBar = new SnackBar();
	//         snackBar.create('Movie was succesfully added!');
	//         setTimeout(function () { snackBar.delete() }, 3000);

	//         console.log(movies);
	//         clearAllInputs.clear();
	//     }

	//     return movies;
	// }

	async favorites() {
		const favoriteMovies = localStorageServices.unpackMoviePackage();

		if (favoriteMovies.length === 0) {
			resultBuilderService.noResult();
		} else {
			for (let i = 0; i < favoriteMovies.length; i++) {
				const tooltipObject = await tooltipServices.createTooltipData(favoriteMovies[i]);
				const favoriteButtonObject = tooltipServices.createFavoritesButton(favoriteMovies[i].movieId, favoriteMovies[i].favoritesButtonState);
				resultBuilderService.buildMovieCard(tooltipObject, favoriteButtonObject, "favoriteMovies");
			}
		}
	}
}
