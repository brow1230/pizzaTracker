let pages = [];
let index = "";


document.addEventListener("DOMContentLoaded", init);

function init() {
    pageSwitch();
}

/********************************* NAVIGATION *********************************/
function pageSwitch(){
    pages = document.querySelectorAll('.page');
    pages[0].classList.add('show');
    console.log(pages)
    pages.forEach(page => {
        page.querySelector('.navigate').addEventListener('click', navigate); //add the class "navigate" to any html element to make it switch pages (needs a data-target aswell)
    });
}

function navigate(ev) {
    ev.preventDefault();
    let currentPage = ev.currentTarget;
    if (currentPage.getAttribute("data-id")) {
        index = currentPage.getAttribute("data-id");
    }
    console.log(currentPage);
    document.querySelector('.show').classList.remove('show');
    let target = currentPage.getAttribute('data-target');
    document.getElementById(target).classList.add('show');
    

}

