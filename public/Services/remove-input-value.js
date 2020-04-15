class ClearAllInputs {
    clear () {
        document.getElementById('addTitleInput').value = '';
        document.getElementById('addCategoryInput').value = '';
        document.getElementById('addRatingInput').value = '';
        document.getElementById('addYearInput').value = '';
        document.getElementById('addActorsInput').value = '';
    }
}

export const clearAllInputs = new ClearAllInputs();