let pages = [];
let show = new Event('show');


document.addEventListener("DOMContentLoaded", init);

function init() {
    pages = document.querySelectorAll('.page');
        pages.forEach((pg)=>{
            pg.addEventListener('show', pageShown);
        })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', navigate);
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', poppin);
}



function navigate(ev) {
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.display').classList.remove('display');
    document.getElementById(currentPage).classList.add('display');
    console.log(currentPage)
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(show);
    }

function pageShown(ev){
    console.log('Page', ev.target.id, 'just shown');
    let h1 = ev.target.querySelector('h1');
    h1.classList.add('big')
    setTimeout((h)=>{
        h.classList.remove('big');
    }, 1200, h1);
}

function poppin(ev){

    console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.display').classList.remove('display');
        document.getElementById(hash).classList.add('display');
        console.log(hash)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(show);
}




/********************************* MODAL *********************************/
let btn = document.querySelector('.signInBtn'),
    modal = document.querySelector('.modal'),
    closeBtn = document.querySelector('.closeBtn');
    signUpBtn = document.querySelector('.signUpBtn');

//    signUpBtn.addEventListener('click', function () {
//         modal.style.display = "none";
//     })

btn.addEventListener('click', function () {
    modal.style.display = 'flex';
    console.log("clicked");
})

closeBtn.addEventListener('click', function () {
    modal.style.display = "none";
})

window.addEventListener('click', function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
})
