import { TooltipServices } from "./tooltip-services";
import { Results } from "../Model/results";


export class ResultBuilderService {
    body:HTMLElement;
    tooltipServices:any;
    constructor() {
        this.body = document.body;
        this.tooltipServices = new TooltipServices();


    }
    noResult():void {
        const body: HTMLElement = document.body;

        const noResults:HTMLHeadingElement = document.createElement('h1');
        body.appendChild(noResults);
        noResults.setAttribute('id', 'noResultsMessage');
        noResults.innerHTML = 'No movies match your search!';


    }

    async build(titleResults:Array<Results>, searchResults: Array<Results>):Promise<void> {
        const maxLength :any = this.returnMaxLength(titleResults, searchResults);
        const body :HTMLElement = document.getElementById('body');
        const movieResults :HTMLDivElement = document.createElement('div');
        const containerNameDefault:string = "movieResults";
        body.appendChild(movieResults);
        movieResults.setAttribute('class', 'movieResults');

        for (let i:number = 0; i < maxLength.titleMaxLenght; i++) {
            const tooltip = await this.tooltipServices.createTooltipData(titleResults[i]);
            const favoritesButton = this.tooltipServices.createFavoritesButton(tooltip.movieId, false);
            console.log(favoritesButton)
            this.buildMovieCard(tooltip, favoritesButton, containerNameDefault);

        }
        for (let j:number = 0; j < maxLength.searchResultsMaxLength; j++) {
            const tooltip = await this.tooltipServices.createTooltipData(titleResults[j]);
            const favoritesButton = this.tooltipServices.createFavoritesButton(tooltip.movieId, false);
            this.buildMovieCard(tooltip, favoritesButton, containerNameDefault);

        }



    }

    buildMovieCard(tooltipObject:Partial<Results>, favoritesButtonObject:Partial<Results>, parentContainerName:string):void {
        console.log('build movie card');

        const movieResults:HTMLElement = document.querySelector(`.${parentContainerName}`);
        const movieContainer: HTMLDivElement = document.createElement('div');
        const img: HTMLImageElement = document.createElement('img');
        const h1: HTMLElement = document.createElement('H1');
        const movieId : number = tooltipObject.id;


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



        this.tooltipServices.createTooltip(tooltipObject, favoritesButtonObject);
        const favoritesButton: HTMLElement = document.getElementById(favoritesButtonObject.favoritesButtonId);

        movieContainer.addEventListener("mouseenter", (event:MouseEvent) => {
            const imgRect:ClientRect = (event.target as HTMLImageElement).getBoundingClientRect();
            this.tooltipServices.showTooltip(tooltipObject, imgRect);
        });

        movieContainer.addEventListener("mouseenter", (e:MouseEvent) => {
            const imgRect: ClientRect = (e.target as HTMLImageElement).getBoundingClientRect();
            this.tooltipServices.showFavoritesButton(tooltipObject, favoritesButtonObject, imgRect)
        })

        favoritesButton.addEventListener('click', (event:MouseEvent) => {
            if(favoritesButtonObject.favoritesButtonState === false){
                favoritesButtonObject.favoritesButtonState = true;
            } else {
                favoritesButtonObject.favoritesButtonState = false;
            }
            this.tooltipServices.toggleFavoritesButton(tooltipObject, favoritesButtonObject);

        })
        movieContainer.addEventListener("mouseleave", event => {
            
            this.tooltipServices.hideTooltip(tooltipObject);
        })
        movieContainer.addEventListener("mouseleave", e => {
            this.tooltipServices.hideFavoritesButton(favoritesButtonObject);
        })



    }



    returnMaxLength(title:Array<any>, searchResults: Array<any>):any {
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
            if (searchResults.length = 0) {
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
            if (title.length > 20) {
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