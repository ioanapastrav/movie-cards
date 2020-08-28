export class AwakeHideContainer {
    awakeAddContainer (){
        const awakeItem:HTMLElement = document.getElementById('addContainer');
        return awakeItem.style.visibility = "visible";
    }
    hideAddContainer (){
        const hideItem: HTMLElement= document.getElementById('addContainer');
        return hideItem.style.visibility = "hidden";
    }
    awakeSearchContainer (){
        const awakeItem: HTMLElement = document.getElementById('searchContainer');
        return awakeItem.style.visibility = "visible";
    }
    hideSearchContainer (){
        const hideItem: HTMLElement = document.getElementById('searchContainer');
        return hideItem.style.visibility = "hidden";
    }
    awakeFavoritesContainer (){
        const awakeItem: HTMLElement = document.getElementById('favoriteMoviesContainer');
        return awakeItem.style.visibility = "visible";
    }
    hideFavoritesContainer (){
        const hideItem: HTMLElement = document.getElementById('favoriteMoviesContainer');
        return hideItem.style.visibility = "hidden";
    }
    
}