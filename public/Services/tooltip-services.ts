import { Tooltip } from "../Model/tooltip";
import { MovieGenreServices } from "./movie-genre-services";
import { FavoritesButton } from "../Model/favorites-button";
import { LocalStorageService } from "./local-storage-service";
import { Results } from "../Model/results";

export class TooltipServices {
	movieGenreServices: any;
	localStorageService: any;
	constructor() {
		this.movieGenreServices = new MovieGenreServices();
		this.localStorageService = new LocalStorageService();
	}
	async createTooltipData(result: Partial<Results>) {
		if (result.genres) {
			const tooltip: Partial<Results> = new Tooltip(result.id, result.title, result.year, result.genres, result.poster_path);
			return tooltip;
		} else {
			const genres: Array<string> = await this.movieGenreServices.getGenreNames(result.genre_ids);
			const year: string = result.release_date.split("-")[0];
			const tooltip: Partial<Results> = new Tooltip(result.id, result.title, year, genres, result.poster_path);
			return tooltip;
		}
	}

	createTooltip(tooltipObject: Partial<Results>, favoritesButtonObject: Partial<Results>) {
		const movieContainer: HTMLElement = document.getElementById(`${tooltipObject.id}`);
		const tooltip: HTMLDivElement = document.createElement("div");
		const title: HTMLHeadingElement = document.createElement("h3");
		const year: HTMLHeadingElement = document.createElement("h3");
		const button: HTMLButtonElement = document.createElement("button");
		const buttonImage: HTMLImageElement = document.createElement("img");

		movieContainer.append(tooltip);
		tooltip.setAttribute("class", "tooltip");
		tooltip.setAttribute("id", `${tooltipObject.tooltipId}`);
		tooltip.appendChild(title);
		tooltip.appendChild(year);
		tooltip.appendChild(button);
		button.appendChild(buttonImage);

		title.setAttribute("class", "tooltipText");
		year.setAttribute("class", "tooltipText");
		title.innerHTML = tooltipObject.title;
		year.innerHTML = tooltipObject.year;

		let genres: Array<string> = tooltipObject.genres;
		genres.forEach((element) => {
			let genre: HTMLHeadingElement = document.createElement("h3");
			tooltip.appendChild(genre);
			genre.setAttribute("class", "tooltipText");
			genre.setAttribute("class", "thinText");
			genre.innerHTML = element;
		});

		button.setAttribute("class", "favoritesButton");
		button.setAttribute("id", `${favoritesButtonObject.favoritesButtonId}`);

		if (favoritesButtonObject.favoritesButtonState === false) {
			buttonImage.setAttribute("src", "../Assets/img_387724.png");
		} else {
			buttonImage.setAttribute("src", "../Assets/Gold_Star.svg.png");
		}

		buttonImage.setAttribute("class", "favoriteButtonStar");
	}

	showTooltip(tooltipObject: Partial<Results>, imgRect: any): void {
		const tooltip: HTMLElement = document.getElementById(tooltipObject.tooltipId);
		let tooltipRect: any = tooltip.getBoundingClientRect();

		let tooltipTop: number = imgRect.y - tooltipRect.height + imgRect.height / 2 + window.scrollY;
		let tooltipLeft: number = imgRect.x + imgRect.width / 2 - tooltipRect.width / 2;
		tooltip.style.top = `${tooltipTop}`;
		tooltip.style.left = `${tooltipLeft}`;
		tooltip.style.visibility = "visible";
	}

	hideTooltip(tooltipObject: Partial<Results>): void {
		const tooltip: HTMLElement = document.getElementById(tooltipObject.tooltipId);
		tooltip.style.visibility = "hidden";
	}

	createFavoritesButton(movieId: number, state: boolean): any {
		const favoritesButton: any = new FavoritesButton(movieId, state);
		return favoritesButton;
	}

	showFavoritesButton(tooltipObject: Partial<Results>, favoritesButtonObject: Partial<Results>, imgRect: any): void {
		const tooltip: HTMLElement = document.getElementById(`t${favoritesButtonObject.id}`);
		let tooltipRect: any = tooltip.getBoundingClientRect();
		const favoritesButton: HTMLElement = document.getElementById(favoritesButtonObject.favoritesButtonId);
		favoritesButton.style.top = `${tooltipRect.height + imgRect.height / 2 - 55}`;
		favoritesButton.style.left = `${tooltipRect.width / 2 + imgRect.width / 2 - 25}`;
		favoritesButton.style.visibility = "visible";

		favoritesButton.addEventListener("click", (e) => {
			this.toggleFavoritesButton(tooltipObject, favoritesButtonObject);
		});
	}

	hideFavoritesButton(favoritesButtonObject: Partial<Results>): void {
		const favoritesButton: HTMLElement = document.getElementById(favoritesButtonObject.favoritesButtonId);
		favoritesButton.style.visibility = "hidden";
	}

	toggleFavoritesButton(tooltipObject: Partial<Results>, favoritesButtonObject: Partial<Results>) {
		const favoritesButton: HTMLElement = document.getElementById(favoritesButtonObject.favoritesButtonId);
		const favoritesButtonStar: ChildNode = favoritesButton.firstChild;

		const state: boolean = favoritesButtonObject.favoritesButtonState;

		if (state === true) {
			this.localStorageService.addToStorage(tooltipObject, favoritesButtonObject);
			(favoritesButtonStar as HTMLImageElement).setAttribute("src", "../Assets/Gold_Star.svg.png");
			return;
		} else {
			this.localStorageService.removeFromStorage(tooltipObject);

			(favoritesButtonStar as HTMLImageElement).setAttribute("src", "../Assets/img_387724.png");
			return;
		}
	}
}
