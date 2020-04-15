import { TooltipServices } from "./tooltip-services.js";






export class ResultBuilderService {
    constructor() {
        this.body = document.getElementById('body');
        this.tooltipServices = new TooltipServices();


    }
    noResult() {
        const body = document.getElementById('body');

        const noResults = document.createElement('h1');
        body.appendChild(noResults);
        noResults.setAttribute('id', 'noResultsMessage');
        noResults.innerHTML = 'No movies match your search!';


    }

    async build(titleResults, searchResults) {
        const maxLength = this.returnMaxLength(titleResults, searchResults);
        const body = document.getElementById('body');
        const movieResults = document.createElement('div');
        const containerNameDefault = "movieResults";
        body.appendChild(movieResults);
        movieResults.setAttribute('class', 'movieResults');

        for (let i = 0; i < maxLength.titleMaxLenght; i++) {
            const tooltip = await this.tooltipServices.createTooltip(titleResults[i]);
            const favoritesButton = this.tooltipServices.createFavoritesButton(tooltip.movieId, false);
            console.log(favoritesButton)
            this.buildMovieCard(tooltip, favoritesButton, containerNameDefault);

        }
        for (let j = 0; j < maxLength.searchResultsMaxLength; j++) {
            const tooltip = await this.tooltipServices.createTooltip(titleResults[j]);
            const favoritesButton = this.tooltipServices.createFavoritesButton(tooltip.movieId, false);
            this.buildMovieCard(tooltip, favoritesButton, containerNameDefault);

        }



    }

    buildMovieCard(tooltipObject, favoritesButtonObject, parentContainerName) {
        console.log('build movie card');

        const movieResults = document.querySelector(`.${parentContainerName}`);
        const movieContainer = document.createElement('div');
        const img = document.createElement('img');
        const h1 = document.createElement('H1');
        const movieId = tooltipObject.movieId;


        movieContainer.setAttribute('class', 'movieContainer');
        movieContainer.setAttribute('id', `${movieId}`)
        movieResults.appendChild(movieContainer);
        movieContainer.appendChild(img);
        movieContainer.appendChild(h1);

        img.setAttribute('class', 'moviePoster');
        h1.setAttribute('class', 'movieTitle');


        if (tooltipObject.poster_path) {
            img.setAttribute('src', `https://image.tmdb.org/t/p/original/${tooltipObject.poster_path}`);
        } else {
            img.setAttribute('src', 'https://mymdb.comyn.pw/img/posters/noposter.jpg');
        }


        
        h1.innerHTML = `${tooltipObject.title} `;
        // } else {
        //     h1.innerHTML = `${tooltipObject.name} `;
        // }



        this.tooltipServices.initiateTooltip(tooltipObject, favoritesButtonObject);
        const favoritesButton = document.getElementById(favoritesButtonObject.id);

        movieContainer.addEventListener("mouseenter", event => {
            console.log('image mouseenter');
            const imgRect = event.target.getBoundingClientRect();
            this.tooltipServices.showTooltip(tooltipObject, imgRect);
        });

        movieContainer.addEventListener("mouseenter", e => {
            const imgRect = event.target.getBoundingClientRect();
            this.tooltipServices.showFavoritesButton(tooltipObject, favoritesButtonObject, imgRect)
        })

        favoritesButton.addEventListener('click', event => {
            if(favoritesButtonObject.state === false){
                favoritesButtonObject.state = true;
            } else {
                favoritesButtonObject.state = false;
            }
            this.tooltipServices.toggleFavoritesButton(tooltipObject, favoritesButtonObject);

        })
        movieContainer.addEventListener("mouseleave", event => {
            console.log('image mouseleave');
            this.tooltipServices.hideTooltip(tooltipObject);
        })
        movieContainer.addEventListener("mouseleave", e => {
            this.tooltipServices.hideFavoritesButton(favoritesButtonObject);
        })



    }



    returnMaxLength(title, searchResults) {
        if (title.length > 10 && searchResults.length > 10) {
            return {
                titleMaxLenght: 10,
                searchResultsMaxLength: 10
            };
        } else if (title.length < 10 && searchResults.length > 10) {
            return {
                titleMaxLenght: title.length,
                searchResultsMaxLength: 20 - title.length
            }
        } else if (title.length > 10 && searchResults.length < 10) {
            return {
                titleMaxLenght: 20 - searchResults.length,
                searchResultsMaxLength: searchResults.length
            }
        } else if (title.length < 10 && searchResults.length < 10) {
            return {
                titleMaxLenght: title.length,
                searchResultsMaxLength: searchResults.length
            }
        } else if (title.length = 0) {
            if (searchResults = 0) {
                return {
                    titleMaxLenght: 0,
                    searchResultsMaxLength: 0
                }
            } else if (searchResults.length > 20) {
                return {
                    titleMaxLenght: 0,
                    searchResultsMaxLength: 20
                }
            } else {
                return {
                    titleMaxLenght: 0,
                    searchResultsMaxLength: searchResults.length
                }
            }

        } else if (searchResults.length = 0) {
            if (title.results > 20) {
                return {
                    titleMaxLenght: 20,
                    searchResultsMaxLength: 0
                }
            } else {
                return {
                    titleMaxLenght: title.length,
                    searchResultsMaxLength: 0
                }
            }
        }
    }
}