import { AwakeHideContainer } from "../Services/awake-hide";
import { movieController } from "../Services/create-services";

class AppInitializationService {
	awakeHideContainer: any;
	constructor() {
		this.awakeHideContainer = new AwakeHideContainer();
	}
	intialize() {
		document.querySelector("#searchButton").addEventListener("click", movieController.search);

		document.querySelector("#searchPage").addEventListener("click", this.awakeHideContainer.hideAddContainer);
		document.querySelector("#searchPage").addEventListener("click", this.awakeHideContainer.hideFavoritesContainer);
		document.querySelector("#searchPage").addEventListener("click", this.awakeHideContainer.awakeSearchContainer);
		document.querySelector("#searchPage").addEventListener("click", this.awakeHideContainer.awakeSearchContainer);
		document.querySelector("#searchPage").addEventListener("click", movieController.clean);

		document.querySelector("#addMoviePage").addEventListener("click", this.awakeHideContainer.awakeAddContainer);
		document.querySelector("#addMoviePage").addEventListener("click", this.awakeHideContainer.hideSearchContainer);
		document.querySelector("#addMoviePage").addEventListener("click", this.awakeHideContainer.hideFavoritesContainer);
		document.querySelector("#addMoviePage").addEventListener("click", movieController.clean);

		document.querySelector("#favoriteMoviePage").addEventListener("click", this.awakeHideContainer.hideAddContainer);
		document.querySelector("#favoriteMoviePage").addEventListener("click", this.awakeHideContainer.hideSearchContainer);
		document.querySelector("#favoriteMoviePage").addEventListener("click", this.awakeHideContainer.awakeFavoritesContainer);
		document.querySelector("#favoriteMoviePage").addEventListener("click", movieController.clean);
		document.querySelector("#favoriteMoviePage").addEventListener("click", movieController.favorites);

		// document.querySelector('#addButton').addEventListener('click', movieController.add);
	}
}

const appInitializationService = new AppInitializationService();
export const initialize = appInitializationService.intialize();
