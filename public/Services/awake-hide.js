export class AwakeHideContainer {
    awakeAddContainer (){
        const awakeItem = document.getElementById('addContainer');
        return awakeItem.style.visibility = "visible";
    }
    hideAddContainer (){
        const hideItem = document.getElementById('addContainer');
        return hideItem.style.visibility = "hidden";
    }
    awakeSearchContainer (){
        const awakeItem = document.getElementById('searchContainer');
        return awakeItem.style.visibility = "visible";
    }
    hideSearchContainer (){
        const hideItem = document.getElementById('searchContainer');
        return hideItem.style.visibility = "hidden";
    }
    awakeFavoritesContainer (){
        const awakeItem = document.getElementById('favoriteMoviesContainer');
        return awakeItem.style.visibility = "visible";
    }
    hideFavoritesContainer (){
        const hideItem = document.getElementById('favoriteMoviesContainer');
        return hideItem.style.visibility = "hidden";
    }
    
}