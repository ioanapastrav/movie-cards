export class FavoritesButton {
    constructor (movieId, state){
        this.movieId = movieId
        this.id = `f${movieId}`;
        this.state = state ;
    }
}