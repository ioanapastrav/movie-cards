export class SnackBar {
    create (message){
        const errorForm = document.getElementById('errorForm');
        const errorLabel = document.getElementById('errorLabelTitle');
        const snackBar = document.createElement('div');
        const p = document.createElement('p');
        errorForm.insertBefore(snackBar, errorLabel);
        snackBar.appendChild(p);
        snackBar.setAttribute('class', 'snackBar');
        snackBar.setAttribute('id', 'snackBar');
        p.setAttribute('class', 'snackBarMessage');
        p.innerHTML = message;
    }
    delete (){
        const snackBar = document.getElementById('snackBar');
        snackBar.remove();
    }
}

