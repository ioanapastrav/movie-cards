import { Results } from "../Model/results";

export class LocalStorageService {
    createMoviePackage (tooltipObject:Partial<Results>, favoritesButtonObject:Partial<Results>):string{
        const movieSpecs:Partial<Results> = {
            id: tooltipObject.id,
            tooltipId: tooltipObject.tooltipId,
            title: tooltipObject.title,
            year: tooltipObject.year,
            genres: tooltipObject.genres,
            poster_path: tooltipObject.poster_path,
            favoritesButtonId: favoritesButtonObject.favoritesButtonId,
            favoritesButtonState: favoritesButtonObject.favoritesButtonState

        }
        
        const movieSpecsString:string = JSON.stringify(movieSpecs);
        return movieSpecsString;
    }

    unpackMoviePackage (){
        const favoriteMovies :Array<any>= []
        for (let i:number = 0; i < localStorage.length; i++) {
            console.log(localStorage)
            let key:string = localStorage.key(i);
            let movieSpecsString:string = localStorage.getItem(key);
            let movieSpecs:any = JSON.parse(movieSpecsString);
            favoriteMovies.push(movieSpecs);

        }
        return favoriteMovies;
    }

    addToStorage (tooltipObject:Partial<Results>, favoritesButtonObject:Partial<Results>):void{
        const moviePack:string = this.createMoviePackage(tooltipObject,favoritesButtonObject)
        const movieIdString:string = JSON.stringify(tooltipObject.id);
       
        localStorage.setItem(`${movieIdString}`, `${moviePack}`);
    }

    removeFromStorage(tooltipObject:Partial<Results>):void{
        const movieIdString:string = JSON.stringify(tooltipObject.id);
        localStorage.removeItem(`${movieIdString}`);
    }
}