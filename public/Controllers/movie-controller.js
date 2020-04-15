import { searchService, resultBuilderService, tooltipServices } from '../Services/create-services.js';

import { fieldRules } from './field-rules.js';
import { clearAllInputs } from '../Services/remove-input-value.js';
import { SnackBar } from '../Services/snak-bar.js';




export class MovieController {
    constructor() {
        //  this.searchService = new SearchService(); 
        //  this.resultBuilderService = new ResultBuilderService();
    }
    clean() {
        let movieResults = document.querySelector('.movieResults');
        if (!!movieResults) {
            movieResults.remove();
        }
        let noResultsMessage = document.getElementById('noResultsMessage');
        if (!!noResultsMessage) {
            noResultsMessage.remove();
        }
        let favoriteMovies = document.querySelector('.favoriteMovies');
        let child = favoriteMovies.lastElementChild;
        while (child) {
            favoriteMovies.removeChild(child);
            child = favoriteMovies.lastElementChild;
        }

    }
    async search() {
        try {


            let title = document.getElementById('searchTitleInput').value;
            let year = document.getElementById('searchYearInput').value;
            let category = document.getElementById('searchCategoryInput').value;
            let rating = document.getElementById('searchRatingInput').value;
            let actors = document.getElementById('searchActorsInput').value;


            if (!title && !year && !category && !rating && !actors) {
                resultBuilderService.noResult();
            } else if (!title) {
                const titleResults = [];
                const results = await searchService.search(year, rating, actors, category);
                console.log(results)
                if (results.length === 0) {
                    resultBuilderService.noResult();
                } else {
                    resultBuilderService.build(titleResults, results);
                }
            } else if (!year && !category && !rating && !actors) {
                let titleResults = await searchService.searchTitle(title);
                let results = [];

                if (titleResults.length === 0) {
                    resultBuilderService.noResult();
                } else {
                    resultBuilderService.build(titleResults, results);
                }

            } else {
                let titleResults = await searchService.searchTitle(title);
                const results = await searchService.search(year, rating, actors, category);

                resultBuilderService.build(titleResults, results);
            }

            document.getElementById('searchTitleInput').value = '';
            document.getElementById('searchYearInput').value = '';
            document.getElementById('searchCategoryInput').value = '';
            document.getElementById('searchRatingInput').value = '';
            document.getElementById('searchActorsInput').value = '';

        }
        catch (error) {
            console.log(error)
        }


    }
    add() {
        let title = document.getElementById('addTitleInput').value;
        let category = document.getElementById('addCategoryInput').value;
        let rating = document.getElementById('addRatingInput').value;
        let year = document.getElementById('addYearInput').value;
        let actors = document.getElementById('addActorsInput').value;


        for (const fieldKey in fieldRules) {
            const fieldRule = fieldRules[fieldKey];
            const fieldValue = document.getElementById(fieldRule.fieldId);
            const errorLabel = document.getElementById(fieldRule.errorId);
            const input = document.getElementById(fieldRule.fieldId);
            input.classList.remove('inputError');
            errorLabel.innerHTML = "";


            for (let i = 0; i < fieldRule.rules.length; i++) {
                let rule = fieldRule.rules[i];
                const validationResult = rule.isValid(fieldValue.value);

                if (validationResult.isValid) {
                    fieldRule.inputOk = true;
                }
                else {
                    const errorLabel = document.getElementById(fieldRule.errorId);
                    const input = document.getElementById(fieldRule.fieldId);
                    errorLabel.innerHTML = validationResult.errorMessage;
                    input.classList.add('inputError');
                    fieldRule.inputOk = false;
                    break;
                }

            }
        }
        let count = 0;
        for (const fieldKey in fieldRules) {
            const fieldRule = fieldRules[fieldKey];

            if (fieldRule.inputOk === true) {
                count = count + 1;
            }

        };


        if (count === 5) {
            const newMovie = new Movie(title, category, rating, year, actors);
            movies.push(newMovie);
            console.log(newMovie);
            let snackBar = new SnackBar();
            snackBar.create('Movie was succesfully added!');
            setTimeout(function () { snackBar.delete() }, 3000);

            console.log(movies);
            clearAllInputs.clear();
        }



        return movies;
    }
   async favorites() {
        
        const favoriteMovies = [];
        for (let i = 0; i < localStorage.length; i++) {
            // localStorage.clear()
            console.log(localStorage)
            let key = localStorage.key(i);
            let movieSpecsString = localStorage.getItem(key);
            let movieSpecs = JSON.parse(movieSpecsString);
            favoriteMovies.push(movieSpecs);

        }

        console.log(favoriteMovies);
        if (favoriteMovies.length === 0) {
            resultBuilderService.noResult();
        } else {
            for (let i = 0; i < favoriteMovies.length; i++) {
                const tooltipObject = await tooltipServices.createTooltip(favoriteMovies[i]);
                const favoriteButtonObject = tooltipServices.createFavoritesButton(favoriteMovies[i].movieId, favoriteMovies[i].favoritesButtonState )
                resultBuilderService.buildMovieCard(tooltipObject, favoriteButtonObject, 'favoriteMovies');
            }
        }

    }
}