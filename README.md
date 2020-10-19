# movie-cards
## Overview
Movie-cards is a webapp that offers a visualization layer over themoviedb.org public api.


It's main features are:
- offering multiple types of search parameters such as movie title, year, movie category, rating, actors.
- the ability to save user's favorites in localstorage

## Runing the app
```bash
npm start
```
open the browser at `http://localhost:3000`

## Project structure

The project follows a MVC architecture described below.

### Model
#### `public/Model/results.ts`
The search result model.

#### `public/Model/tooltip.ts`
Movie tooltip model.

### Controllers
#### `public/Controllers/movie-controller.ts`
Build the server result when searching for a movie, clean the previous results, check localstorage for favorite movies and build the favourite movie results.

#### `public/Controllers/input-content-rules.ts`
Verify if the writen content in the search input is valid.

### Views
#### `public/View/search-movies.html`

### Services
#### `public/Services/create-services.ts`
Instantiates the services used by app.

#### `public/Services/local-storage-service.ts`
Serialize/deserialize information from localstorage.

#### `public/Services/movie-genre-services.ts`
Fetches the movie genre names.

#### `public/Services/url-builder-service.ts`
Handles url building for accessing the API on themoviedb.org.

#### `public/Services/result-builder-service.ts`
A view service that helps building pieces of layout during the rendering of search results. E.g. create movie cards.

#### `public/Services/search-service.ts`
Fetches search results.

#### `public/Services/string-utils.ts`
String utilities.

#### `public/Services/tooltip-services.ts`
Create tooltip object instances, access the DOM in order to render, show, hide, the tooltip, as well as create, show, hide and toggle the favorites button.

