
import { ResultBuilderService } from './result-builder-service.js';
import { SearchService } from './search-service.js';

// import { AwakeHideContainer } from './awake-hide.js';

import { TooltipServices } from './tooltip-services.js';
import { MovieController } from '../Controllers/movie-controller.js';



export const searchService = new SearchService();
export const resultBuilderService = new ResultBuilderService();
export const tooltipServices = new TooltipServices();
export const movieController = new MovieController();




