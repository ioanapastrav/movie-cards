

import { UrlBuilderService } from './url-builder-service.js';


export class SearchService {
    constructor() {
        this.movieTitleUrl = 'https://api.themoviedb.org/3/search/movie';
        this.apiKey = 'e73cc9a1d35973b3e89a34bba502663c';
        this.urlBuilderService = new UrlBuilderService()
    }
    async searchTitle(movieTitle) {

        try {
            let encodedMovieTitle = encodeURIComponent(movieTitle);
            let endpointMovieTitle = `${this.movieTitleUrl}?api_key=${this.apiKey}&query=${encodedMovieTitle}`;

            
            const titleResults = await fetch(endpointMovieTitle);
            
            if (titleResults.ok) {
                const jsonTitleResult = await titleResults.json();
               
                return jsonTitleResult.results;
            }
            throw new Error('Request failed!');

        }
        catch (error) {
            console.log(error);
        }

    }
   
    async search(year, rating, actors, category) {
        try {
            this.urlBuilderService.init();
            await this.urlBuilderService.appendYearIfDefined(year);
            await this.urlBuilderService.appendRatingIfDefined(rating);
            await this.urlBuilderService.appendActorsIfDefined(actors);
            await this.urlBuilderService.appendCategoryIfDefined(category);
            const url = await this.urlBuilderService.getGlobalUrl();
            if(url === false){
                return [];
            }
            const results = await fetch(url);
            
            if (results.ok) {
                let jsonResult = await results.json();
              
                return jsonResult.results;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

}

