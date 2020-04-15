export class MovieGenreServices {
    async getGenreNames (ids){
        let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=e73cc9a1d35973b3e89a34bba502663c';
        let result = await fetch(url);
        const genreNames = [];
        if (result.ok) {
            const jsonResult = await result.json();
            const genreList = jsonResult.genres;
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