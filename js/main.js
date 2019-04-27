let frontEnd = {
        pages: [],
        show: new Event('show'),
        admin: true,

        start: function () {
            document.addEventListener("DOMContentLoaded", frontEnd.init);
        },

        init: function () {
            frontEnd.pageSwitch();
            frontEnd.addListeners();
            // showAdmin();
            backEnd.findAllPizzas();

        },

        addListeners: function () {
            let signUpSubmit_Btn = document.getElementById('signUpSubmit')
            let signIn_Btn = document.getElementById('signIn')

            // document.querySelector('.confirmBtn').addEventListener('click', doLogin);
            signUpSubmit_Btn.addEventListener('click', backEnd.postNewUser)
            signIn_Btn.addEventListener('click', backEnd.loginUser)


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

            togglePassword.addEventListener('change', frontEnd.showPassword);



        },

        pageSwitch: function () {
            pages = document.querySelectorAll('.page');
            pages.forEach((pg) => {
                pg.addEventListener('show', frontEnd.pageShown);
            })

            document.querySelectorAll('.nav-link').forEach((link) => {
                link.addEventListener('click', frontEnd.navigate);
            })
            history.replaceState({}, 'Home', '#homePage');
            window.addEventListener('popstate', frontEnd.poppin);
        },

        navigate: function (ev) {
            ev.preventDefault();
            let currentPage = ev.target.getAttribute('data-target');
            document.querySelector('.display').classList.remove('display');
            document.getElementById(currentPage).classList.add('display');
            console.log(currentPage)
            history.pushState({}, currentPage, `#${currentPage}`);
            document.getElementById(currentPage).dispatchEvent(frontEnd.show);
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
            document.getElementById(hash).dispatchEvent(frontEnd.show);
        },

        //show password checkbox
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

        userNotification: function () {

            let modaldiv = document.createElement('div'),
                closeBtn = document.createElement('button'),
                span = document.createElement('span');

            modaldiv.setAttribute('class','userAlert alert ')
            closeBtn.setAttribute('type','button');
            closeBtn.setAttribute('class','close');
            closeBtn.setAttribute('data-dismiss','alert');
            closeBtn.setAttribute('aria-label','Close');

            // span.setAttribute('aria-hidden','true');
            span.textContent = 'x';


            modaldiv.appendChild(closeBtn);
            closeBtn.appendChild(span);
            document.body.appendChild(modaldiv);
            
            
            window.setTimeout(function() {
                $(".userAlert").alert('close')
            }, 5000);

        },
    }

        let backEnd = {

    isAdmin:false,
    isLoggedIn:false,
    id:null,
    token:null,
    //base URL,
    url: "http://99.79.103.208:3030/api/",
    //basic GET request for pizza
    /////////////////////////
    ///  PIZZAS FUNCTIONS ///
    /////////////////////////

    //finding pizzas
    findAllPizzas:function(){
        fetch(backEnd.url+"pizzas/")
        .then((res) => {
            return res.json()
        })
        .then((res)=> {
            // console.log(res)
            backEnd.buildPizzaList(res)
        })

    },
    findAPizza: function (ev) {
        let id = ev.target.getAttribute('data-id')

        fetch(backEnd.url + "pizzas/" + id)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                backEnd.editingPizza(res)
            })
    },
    //making the pizzas appear on the page
    buildPizzaList: function (res) {
        res.data.forEach(function (item) {
            let table = document.getElementById('pizzaList')
            //find the element for use later
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
            // console.log(item)
            remove.addEventListener('click', backEnd.deletePizza)
            edit.addEventListener('click', backEnd.findAPizza)
        })
    },

    //adding new pizzas
    
    //editing pizzas
    editingPizza:function(){
        // backEnd.forward('.')
    },
    //deleting pizzas
    deletePizza:function(ev){
        let id = ev.target.getAttribute('data-id')
            let option = {
                method: 'DELETE',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + myShit.token
                },
            }
            fetch(backEnd.url+'pizzas/' + id, option)
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res)
                let box = ev.target.parentElement.parentElement.parentElement
                box.innerHTML = " "
                backEnd.findAllPizzas()
            })
    },

    ///////////////////////////////////
    ///     INGREDIENTS FUNCTIONS   ///
    ///////////////////////////////////
    getAllIngredients:function(){
        fetch(backEnd.url+"ingredients/")
        .then((res) => {
            return res.json()
        })
        .then((res)=> {
            backEnd.buildIngredientsList(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    },

    //Building Ingredients List
    buildIngredientsList: function (res) {
        res.data.forEach(function (item) {
            let table = document.getElementById('ingredientsList')
            //find the element for use later
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
            // console.log(item)
            remove.addEventListener('click', backEnd.deleteIngredient)
            // edit.addEventListener('click', backEnd.findAPizza)
        })
    },

    //Delete One Ingrident
    deleteIngredient:function(ev){
        let id = ev.target.getAttribute('data-id')
            let option = {
                method: 'DELETE',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + myShit.token
                },
            }
            fetch(backEnd.url+'ingredients/' + id, option)
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res)
                let box = ev.target.parentElement.parentElement.parentElement
                box.innerHTML = " "
                backEnd.getAllIngredients()
            })
    },


    /////////////////////////////
    /// MAKE NEW USER ACCOUNT ///
    /////////////////////////////
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
        fetch(backEnd.url + "auth/users", option)
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
            fetch(backEnd.url + "auth/users/token", option)

            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(res.error){
                    console.log('error')
                }else{
                    backEnd.token = res.data
                    backEnd.isLoggedIn = true;

                    localStorage.setItem('bearer', JSON.stringify(backEnd.token.data))
                    setTimeout(backEnd.getUserInfo, 1500)        
                    console.log("sucess")
                }
            })
        } catch (err) {
            console.log("something happened!--------------------------------")
            console.log(err)
        }
    },

    ////////////////////////////////////////////////
    ///     USER PROFILE, PASSWORD CHANGING      ///
    ////////////////////////////////////////////////

    //GET user profile info
    getUserInfo: function () {
        let option = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myShit.token
            }
        }
        try {
            fetch(backEnd.url + "auth/users/me", option)

            .then((res) => {
                return res.json()
            })
            .then((data) =>{
                backEnd.isAdmin = data.data.isStaff

                backEnd.profileBuilder(data.data)
                
                if(backEnd.isAdmin){
                    console.log('Admin')
                    //do admin things 
                    backEnd.getAllIngredients()

                }else{
                    console.log('Customer')
                    //do customer things
                }
                backEnd.forward('.pizzaListContainer')
            })
        }catch(err){
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

        backEnd.id = userData._id
    },
    changePassword:function() {
        try{
            let email = document.getElementById('staticEmail').value
            let firstCopy = document.getElementById('newPassword').value
            let secondCopy = document.getElementById('retypeNewPassword').value
            if(firstCopy === secondCopy){
                console.log("MATCHED!")
                backEnd.setNewPassword(firstCopy)
            }else{
                console.log('Passwords didnt match')
            }
        }catch(err){
            console.log(err)
        }
    },
    setNewPassword: function(password){ 
        try{
            // _id:backEnd.id,

            body = {
                password:password
            }
            let option = {
                method: 'PATCH',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + myShit.token
                },
                body:JSON.stringify(body)
            }

            fetch(backEnd.url+ "auth/users", option)
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                console.log(res);
            })
        }catch(err){
            console.log(err)
        }
    },
    ///////////////////////////////
    ///     Page Forwarding     ///
    ///////////////////////////////
    forward:function(page){
        document.querySelector('.modal').style.display = 'none'
        document.querySelector('.display').classList.remove('display')
        document.querySelector(page).classList.add('display')
    },
}

frontEnd.start();
