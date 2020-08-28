

import { UrlBuilderService } from './url-builder-service';


export class SearchService {
    movieTitleUrl:string;
    apiKey:string;
    urlBuilderService:any;
    constructor() {
        this.movieTitleUrl = 'https://api.themoviedb.org/3/search/movie';
        this.apiKey = 'e73cc9a1d35973b3e89a34bba502663c';
        this.urlBuilderService = new UrlBuilderService();
    }
    async searchTitle(movieTitle:string) {

        try {
            let encodedMovieTitle:string = encodeURIComponent(movieTitle);
            let endpointMovieTitle:string = `${this.movieTitleUrl}?api_key=${this.apiKey}&query=${encodedMovieTitle}`;

            
            const titleResults:any = await fetch(endpointMovieTitle);
            
            if (titleResults.ok) {
                const jsonTitleResult:any = await titleResults.json();
               
                return jsonTitleResult.results;
            }
            throw new Error('Request failed!');

        }
        catch (error) {
            console.log(error);
        }

    }
   
    async search(year:number, rating:number, actors:string, category:string) {
        try {
            this.urlBuilderService.init();
            await this.urlBuilderService.appendYearIfDefined(year);
            await this.urlBuilderService.appendRatingIfDefined(rating);
            await this.urlBuilderService.appendActorsIfDefined(actors);
            await this.urlBuilderService.appendCategoryIfDefined(category);
            const url:string = await this.urlBuilderService.getGlobalUrl();
            if(!url){
                return [];
            }
            const results = await fetch(url);
            
            if (results.ok) {
                let jsonResult:any = await results.json();
              
                return jsonResult.results;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

}

