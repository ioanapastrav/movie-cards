export class Tooltip {
    constructor(id, movieTitle, year, genres, posterPath){
        this.movieId = id;
        this.id = `t${id}`;
        this.title = movieTitle;
        this.year = year;
        this.genres = genres;
        this.poster_path = posterPath;
        // this.favoritesButtonId = `f${id}`;
        // this.favoritesButtonState = false;
        // this.favoritesButtonSrc = ''
        

    }
    
}