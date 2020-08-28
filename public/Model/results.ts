export interface Results {
    id:number;
    tooltipId:string;
    favoritesButtonId:string;
    favoritesButtonState:boolean;
    release_date: string;
    year:string;
    poster_path:string;
    genre_ids: Array<number>;
    genres:Array<string>
    title:string;
    vote_average:number;
}