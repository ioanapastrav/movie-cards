import { ResultBuilderService } from "./result-builder-service";
import { SearchService } from "./search-service";

// import { AwakeHideContainer } from './awake-hide.js';

import { TooltipServices } from "./tooltip-services";
import { MovieController } from "../Controllers/movie-controller";
import { LocalStorageService } from "./local-storage-service";

// export class CreateServices {
//     constructor(){
//         this.searchService = new SearchService();
//         this.resultBuilderService = new ResultBuilderService();
//         this.tooltipServices = new TooltipServices();
//         this.localStorageServices = new LocalStorageService();
//         this.movieController = new MovieController();
//     }
// }
export const searchService = new SearchService();
export const resultBuilderService = new ResultBuilderService();
export const tooltipServices = new TooltipServices();
export const localStorageServices = new LocalStorageService();
export const movieController = new MovieController();
