
export class Tooltip {
    id:number;
    tooltipId:string;
    title:string;
    year:string;
    genres:Array<string>;
    poster_path:string;
    constructor(id:number, movieTitle:string, year:string, genres:Array<string>, posterPath:string){
        this.id = id;
        this.tooltipId = `t${id}`;
        this.title = movieTitle;
        this.year = year;
        this.genres = genres;
        this.poster_path = posterPath;
        // this.favoritesButtonId = `f${id}`;
        // this.favoritesButtonState = false;
        // this.favoritesButtonSrc = ''
        

    }
    
}