import { StringUtils } from './string-utils.js';

export class UrlBuilderService {
    constructor (){
        this.movieTitleUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e73cc9a1d35973b3e89a34bba502663c';
        this.actorUrl = 'https://api.themoviedb.org/3/search/person?api_key=e73cc9a1d35973b3e89a34bba502663c';
        this.categoryUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e73cc9a1d35973b3e89a34bba502663c';
        this.globalUrl = '';
        this.discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=e73cc9a1d35973b3e89a34bba502663c';
        this.stringUtils = new StringUtils();
    }
    init (){
        this.globalUrl = '';
        this.globalUrl = this.globalUrl.concat(this.discoverUrl);
    }
    async appendActorsIfDefined (actors){
        if(actors){
            try {
                
                let actorsArray = this.stringUtils.splitNames(actors);
                
                let actorsIds = [];
                for (let i = 0; i < actorsArray.length; i++) {
                    let encodedActors = encodeURIComponent(actorsArray[i]);
                    
                    const results = await fetch(`${this.actorUrl}&query=${encodedActors}`);
                    if (results.ok) {
                        let jsonResults = await results.json();
                        actorsIds.push(jsonResults.results[0].id);
                        
                    }
    
                }
                
                actorsIds.toString();
                this.globalUrl = this.globalUrl.concat(`&with_cast=${actorsIds}`);
    
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    async appendCategoryIfDefined (category) {
        if(category){
            try {
                const categoryIds = [];
                const results = await fetch(`${this.categoryUrl}`);
                const categories = this.stringUtils.splitNames(category);
               
                if(results.ok){
                    const jsonResult = await results.json();
                    const categoryList = jsonResult.genres;
                    categoryList.forEach( element => {
                        categories.forEach( elem => {
                            if(element.name.toLowerCase() === elem){
                                categoryIds.push(element.id);
                            }
                        })
                    })
                    
                }
                
                // categoryIds.toString();
                
                if (categoryIds.length !== 0){
                    this.globalUrl = this.globalUrl.concat(`&with_genres=${categoryIds}`);
                    console.log('Global url', this.globalUrl)
                } 
            }
            catch(error){
                console.log(error)
            }
        }
    }
    appendYearIfDefined (year){
        if(year){
            
            this.globalUrl = this.globalUrl.concat(`&year=${year}`);
        }
    }
    appendRatingIfDefined (rating) {
        if(rating){
            this.globalUrl = this.globalUrl.concat(`&vote_average.gte=${rating}`)
        }
    }
    getGlobalUrl (){
        if(this.globalUrl !== this.discoverUrl){
            return this.globalUrl;
        } else {
            return false;
        }
        
    }
}