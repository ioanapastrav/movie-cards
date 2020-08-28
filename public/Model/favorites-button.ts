export class FavoritesButton {
    id:number;
    favoritesButtonId:string;
    favoritesButtonState:boolean;
    constructor (movieId:number, state:boolean){
        this.id = movieId
        this.favoritesButtonId = `f${movieId}`;
        this.favoritesButtonState = state ;
    }
}