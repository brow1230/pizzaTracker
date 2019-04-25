let front = {
    pages: [],
    show: new Event('show'),
    admin: true,

    start: function () {
        document.addEventListener("DOMContentLoaded", front.init);
    },

    init: function () {
        front.pageSwitch();
        front.addListeners();
        // showAdmin();
        myShit.findAllPizzas();

    },

    addListeners: function () {
        let signUpSubmit_Btn = document.getElementById('signUpSubmit')
        let signIn_Btn = document.getElementById('signIn')

        // document.querySelector('.confirmBtn').addEventListener('click', doLogin);
        signUpSubmit_Btn.addEventListener('click', myShit.postNewUser)
        signIn_Btn.addEventListener('click', myShit.loginUser)


        let signInBtn = document.querySelector('.signInBtn'),
            modal = document.querySelector('.modal'),
            closeBtn = document.querySelector('.closeBtn');
        signUpBtn = document.querySelector('.signUpBtn');

        // Modela disla
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

        let togglePassword = document.getElementById("togglePassword");

        togglePassword.addEventListener('change', front.showPassword);

        

    },

    pageSwitch: function () {
        pages = document.querySelectorAll('.page');
        pages.forEach((pg) => {
            pg.addEventListener('show', front.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', front.navigate);
        })
        history.replaceState({}, 'Home', '#homePage');
        window.addEventListener('popstate', front.poppin);
    },

    navigate: function (ev) {
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.display').classList.remove('display');
        document.getElementById(currentPage).classList.add('display');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(front.show);
    },

    pageShown: function (ev) {
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout((h) => {
            h.classList.remove('big');
        }, 1200, h1);
    },

    popping: function (ev) {
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        document.querySelector('.display').classList.remove('display');
        document.getElementById(hash).classList.add('display');
        console.log(hash)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(front.show);
    },



    showPassword: function () {
        let newPassword = document.getElementById("newPassword"),
            retypeNewPassword = document.getElementById("retypeNewPassword");

        if (newPassword.type === "password") {
            newPassword.type = "text";
        } else {
            newPassword.type = "password";
        }
        if (retypeNewPassword.type === "password") {
            retypeNewPassword.type = "text";

        } else {
            retypeNewPassword.type = "password";
        }
    },

 
}

let myShit = {
    token: null,
    //base URL,
    url: "http://localhost:3030/api/",
    //basic GET request for pizza
    isSignedIn: false,

    findAllPizzas: function () {
        fetch(myShit.url + "pizzas/")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res)
                myShit.buildList(res)
            })
    },
    findAPizza: function (ev) {
        let id = ev.target.getAttribute('data-id')

        fetch(myShit.url + "pizzas/" + id)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res)
            })
    },
    //making the pizzas appear on the page
    buildList: function (res) {
        res.data.forEach(function (item) {
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
            let pizzaID = document.createAttribute('data-id')

            //giving them all the values
            name.textContent = item.name
            price.textContent = item.price
            editID.value = item._id
            removeID.value = item._id
            pizzaID.value = item._id
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
            remove.addEventListener('click', myShit.findAPizza)
            edit.addEventListener('click', myShit.findAPizza)
        })
    },
    //Post request to /users  //////\\\\\\ Makes New User 
    postNewUser: function () {
        let isStaff = null
        let value = document.getElementById('accountType').value
        isStaff = false
        if (value != "false") {
            isStaff = true
        }
        let newUser = {
            "firstName": document.getElementById('firstName').value,
            "lastName": document.getElementById('lastName').value,
            "password": document.getElementById('password').value,
            "email": document.getElementById('email').value,
            "isStaff": isStaff,
        }
        let option = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }
        fetch(myShit.url + "auth/users", option)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
        console.log(newUser)
    },
    //Post reqiest to /users/token /////\\\\\ Login funciton
    loginUser: function () {
        let login = {
            email: document.getElementById('userEmail').value,
            password: document.getElementById('userPassword').value
        }
        let option = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }
        try {
            fetch(myShit.url + "auth/users/token", option)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    console.log(res)
                    myShit.token = res
                    console.log(myShit.token)
                    console.log(myShit.token.data)
                    localStorage.setItem('bearer', JSON.stringify(myShit.token.data))
                })
            console.log("sucess")

            setTimeout(myShit.getUserInfo, 3500)


        } catch (err) {
            console.log("something happened!--------------------------------")
            console.log(err)
        }
    },
    //GET user profile info
    getUserInfo: function () {


        let option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'bearer': myShit.token.data
            }
        }
        try {
            fetch(myShit.url + "auth/users/me", option)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    myShit.profileBuilder(data.data)
                })
        } catch (err) {
            console.log(err)
        }
    },
    profileBuilder: function (userData) {
        let fieldFirstName = document.getElementById('staticFirstName')
        let fieldLastName = document.getElementById('staticLastName')
        let fieldEmail = document.getElementById('staticEmail')

        fieldFirstName.value = userData.firstName
        fieldLastName.value = userData.lastName
        fieldEmail.value = userData.email
    }
}

front.start();