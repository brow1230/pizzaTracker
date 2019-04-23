let pages = [];
let show = new Event('show');
let admin = true;


document.addEventListener("DOMContentLoaded", init);


function init() {
    pageSwitch();
    addListeners();
    // showAdmin();
    myShit.findPizzas();
}

function addListeners() {
    let signUpSubmit_Btn = document.getElementById('signUpSubmit')
    signUpSubmit_Btn.addEventListener('click', myShit.postNewUser)
    // document.querySelector('.confirmBtn').addEventListener('click', doLogin);
}



function pageSwitch() {
    pages = document.querySelectorAll('.page');
    pages.forEach((pg) => {
        pg.addEventListener('show', pageShown);
    })

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', navigate);
    })
    history.replaceState({}, 'Home', '#homePage');
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

function pageShown(ev) {
    console.log('Page', ev.target.id, 'just shown');
    let h1 = ev.target.querySelector('h1');
    h1.classList.add('big')
    setTimeout((h) => {
        h.classList.remove('big');
    }, 1200, h1);
}

function poppin(ev) {

    console.log(location.hash, 'popstate event');
    let hash = location.hash.replace('#', '');
    document.querySelector('.display').classList.remove('display');
    document.getElementById(hash).classList.add('display');
    console.log(hash)
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(hash).dispatchEvent(show);
}






/********************************* MODAL *********************************/
let signInBtn = document.querySelector('.signInBtn'),
    modal = document.querySelector('.modal'),
    closeBtn = document.querySelector('.closeBtn');
    signUpBtn = document.querySelector('.signUpBtn');


signInBtn.addEventListener('click', function () {
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

signUpBtn.addEventListener('click', function () {
    modal.style.display = "none";
})


let myShit = {
    //base URL,
    //If you start mongod and populate the database on your computer, and then start the app it'll work
    url:"http://localhost:3030/api/",
    //basic get request for pizza
    findPizzas:function(){
        fetch(myShit.url+"pizzas/")
        .then((res) => {
            return res.json()
        })
        .then((res)=> {
            console.log(res)
            myShit.buildList(res)
        })
    },
    //making the pizzas appear on the page
    buildList:function(res) {
        res.data.forEach(function(item){
            //find the element for use later
            let table = document.getElementById('pizzaList')
            //creating elements for each item return from the fetch
            let row = document.createElement('tr')
            let name = document.createElement('td')
            let price = document.createElement('td')
            let gf = document.createElement('td')
            let buttons = document.createElement('td')
            let edit = document.createElement('button')
            let remove = document.createElement('button')
            let removeType = document.createAttribute('type')
            let editType = document.createAttribute('type')
            let removeID = document.createAttribute('data-id')
            let editID = document.createAttribute('data-id')


            //giving them all the values
            name.textContent = item.name
            price.textContent = item.price
            editID.value = item.id
            removeID.value = item.id
            gf.textContent = "no"
            edit.textContent = "Edit"
            remove.textContent = "Delete"
            editType.value = "button"
            removeType.value = "button"

            //adding classes and other attributes to the buttons
            edit.classList.add('btn')
            edit.classList.add('btn-dark')
            edit.setAttributeNode(editID)
            edit.setAttributeNode(editType)

            remove.classList.add('btn')
            remove.classList.add('btn-dark')
            remove.setAttributeNode(removeID)
            remove.setAttributeNode(removeType)
            
            //append child
            buttons.appendChild(edit)
            buttons.appendChild(remove)

            row.appendChild(name)
            row.appendChild(price)
            row.appendChild(gf)
            row.appendChild(buttons)

            table.appendChild(row)

            console.log(item)
        })
    },
    postNewUser:function(){
        let isStaff = null
            let value = document.getElementById('accountType').value
            isStaff= false
            if (value != "false"){
                isStaff = true
            }
        let newUser = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            isStaff: isStaff,
        }
        let option = {
            method: 'POST',
            mode: 'cors',
            credentials:'*',
            body: JSON.stringify(newUser)
        }

        fetch(url + "")
        console.log(newUser)


    }
}