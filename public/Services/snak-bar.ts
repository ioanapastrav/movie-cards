export class SnackBar {
    create (message:string):void{
        const errorForm:HTMLElement = document.getElementById('errorForm');
        const errorLabel:HTMLElement = document.getElementById('errorLabelTitle');
        const snackBar:HTMLDivElement = document.createElement('div');
        const p:HTMLParagraphElement = document.createElement('p');
        errorForm.insertBefore(snackBar, errorLabel);
        snackBar.appendChild(p);
        snackBar.setAttribute('class', 'snackBar');
        snackBar.setAttribute('id', 'snackBar');
        p.setAttribute('class', 'snackBarMessage');
        p.innerHTML = message;
    }
    delete ():void{
        const snackBar:HTMLElement = document.getElementById('snackBar');
        snackBar.remove();
    }
}

