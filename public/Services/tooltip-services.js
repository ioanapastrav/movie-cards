import { Tooltip } from '../Model/tooltip.js'
import { MovieGenreServices } from './movie-genre-services.js';
import { FavoritesButton } from '../Model/favorites-button.js';

export class TooltipServices {
    constructor() {
        this.movieGenreServices = new MovieGenreServices();
    }
    async createTooltip(result) {
        if (result.genres) {

            const tooltip = new Tooltip(result.movieId, result.title, result.year, result.genres, result.poster_path);
            return tooltip;
        } else {
            const genres = await this.movieGenreServices.getGenreNames(result.genre_ids);
            const year = result.release_date.split('-')[0];
            const tooltip = new Tooltip(result.id, result.title, year, genres, result.poster_path);
            return tooltip;
        }
    }
    
    initiateTooltip(tooltipObject, favoritesButtonObject) {
        const movieContainer = document.getElementById(tooltipObject.movieId);
        const tooltip = document.createElement('div');
        const title = document.createElement('h3');
        const year = document.createElement('h3');
        const button = document.createElement('button');
        const buttonImage = document.createElement('img');


        movieContainer.append(tooltip);
        tooltip.setAttribute('class', 'tooltip');
        tooltip.setAttribute('id', `${tooltipObject.id}`);
        tooltip.appendChild(title);
        tooltip.appendChild(year);
        tooltip.appendChild(button);
        button.appendChild(buttonImage);


        title.setAttribute('class', 'tooltipText');
        year.setAttribute('class', 'tooltipText');
        title.innerHTML = tooltipObject.title;
        year.innerHTML = tooltipObject.year;


        tooltipObject.genres.forEach(element => {
            let genre = document.createElement('h3');
            tooltip.appendChild(genre);
            genre.setAttribute('class', 'tooltipText');
            genre.setAttribute('class', 'thinText')
            genre.innerHTML = element;
        });


        button.setAttribute('class', 'favoritesButton');
        button.setAttribute('id', `${favoritesButtonObject.id}`);

        if (favoritesButtonObject.state === false) {
            buttonImage.setAttribute('src', '../Assets/img_387724.png');

        } else {
            buttonImage.setAttribute('src', '../Assets/Gold_Star.svg.png');

        }

        buttonImage.setAttribute('class', 'favoriteButtonStar');


    }


    showTooltip(tooltipObject, imgRect) {
        console.log('enter show tooltip');
        const tooltip = document.getElementById(tooltipObject.id);
        let tooltipRect = tooltip.getBoundingClientRect();

        let tooltipTop = imgRect.y - tooltipRect.height + imgRect.height / 2 + window.scrollY;
        let tooltipLeft = imgRect.x + imgRect.width / 2 - tooltipRect.width / 2;
        tooltip.style.top = tooltipTop;
        tooltip.style.left = tooltipLeft;
        tooltip.style.visibility = 'visible';


    }

    hideTooltip(tooltipObject) {
        const tooltip = document.getElementById(tooltipObject.id);
        tooltip.style.visibility = 'hidden';
    }


    createFavoritesButton(movieId, state) {
        const favoritesButton = new FavoritesButton(movieId, state);
        return favoritesButton;
    }

    showFavoritesButton(tooltipObject, favoritesButtonObject, imgRect) {
        const tooltip = document.getElementById(`t${favoritesButtonObject.movieId}`);
        let tooltipRect = tooltip.getBoundingClientRect();
        const favoritesButton = document.getElementById(favoritesButtonObject.id);
        favoritesButton.style.top = tooltipRect.height + imgRect.height / 2 - 40;
        favoritesButton.style.left = tooltipRect.width / 2 + imgRect.width / 2 - 25;
        favoritesButton.style.visibility = "visible";

        favoritesButton.addEventListener('click', e => {

            this.toggleFavoritesButton(tooltipObject, favoritesButtonObject)
        })
    }

    hideFavoritesButton(favoritesButtonObject) {
        const favoritesButton = document.getElementById(favoritesButtonObject.id);
        favoritesButton.style.visibility = "hidden";
    }
    toggleFavoritesButton(tooltipObject, favoritesButtonObject) {
        const favoritesButton = document.getElementById(favoritesButtonObject.id);
        const favoritesButtonStar = favoritesButton.firstChild;

        const movieSpecs = {
            movieId: tooltipObject.movieId,
            tooltipId: tooltipObject.id,
            title: tooltipObject.title,
            year: tooltipObject.year,
            genres: tooltipObject.genres,
            poster_path: tooltipObject.poster_path,
            favoritesButtonId: favoritesButtonObject.id,
            favoritesButtonState: favoritesButtonObject.state

        }
        const movieIdString = JSON.stringify(tooltipObject.movieId);
        const movieSpecsString = JSON.stringify(movieSpecs);
        const state = favoritesButtonObject.state;

        // debugger;
        

        if (state === true) {
            localStorage.setItem(`${movieIdString}`, `${movieSpecsString}`);

            favoritesButtonStar.setAttribute('src', '../Assets/Gold_Star.svg.png');
            return;

        } else {
            localStorage.removeItem(`${movieIdString}`);

            favoritesButtonStar.setAttribute('src', '../Assets/img_387724.png');
            return;
        }
    }
   
}