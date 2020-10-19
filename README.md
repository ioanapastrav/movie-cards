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

### Model
#### `public/Model/results.ts`
Contains an interface that defines contents of the result object that will get passed between different functions of the app.

#### `public/Model/tooltip.ts`
Contains a class that defines contents of the tooltip object that will get passed between different functions of the app.

#### `public/Model/favorites-button.ts`
Contains a class that defines contents of the favorites-button object that will get passed between different functions of the app.

### Controllers
#### `public/Controllers/movie-controller.ts`
Contains functions that handle and build the server result when searching for a movie, clean the previous results, check localstorage for favorite movies and build the favourite movie results.

#### `public/Controllers/input-content-rules.ts`
Contains functions that verify if the writen content in the search input is valid.

### Services
#### `public/Services/create-services.ts`
Contains the instances of the services of the app.

#### `public/Services/local-storage-service.ts`
Contains functions that create, pack and unpack the movie information to and from json object, as well as adds and removes that information from localstorage.

#### `public/Services/movie-genre-services.ts`
Contains a class that sends a request to the server in order to get the movie genre names.

#### `public/Services/url-builder-service.ts`
Contains a function that prepares the urls for accesing the API on themoviedb.org, acording to the search inputs completed.

#### `public/Services/result-builder-service.ts`
Contains functions that access the DOM elements and render the results on page.

#### `public/Services/search-service.ts`
Contains a function that creates a get request with the search inputs.

#### `public/Services/string-utils.ts`
Contains a function that splits a string on the ',' symbol, in order to split the list of actors into separate names.

#### `public/Services/tooltip-services.ts`
Contains functions that create tooltip object instances, access the DOM in order to render, show, hide, the tooltip, as well as create, show, hide and toggle the favorites button.

