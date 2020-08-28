export class MovieGenreServices {
    async getGenreNames (ids:Array<number>){
        let url:string = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e73cc9a1d35973b3e89a34bba502663c';
        let result = await fetch(url);
        const genreNames:Array<string> = [];
        if (result.ok) {
            const jsonResult:any = await result.json();
            const genreList:Array<any>= jsonResult.genres;
            console.log(ids)
            genreList.forEach(elem => {
                ids.forEach(element => {
                    if (elem.id === element) {
                        genreNames.push(elem.name);
                    }
                });
            })

        }
        return genreNames;
    }
}