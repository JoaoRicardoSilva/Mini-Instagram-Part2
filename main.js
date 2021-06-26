"use strict";

// Base class for new Users
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.followers = 0;
        this.following = 0;
        this.html = null;
    }
}

// Memory to save new Users
const memory = [];

// Online state:
let online = false;

// Index in the memory for the user that have log
let indexUser = -1;

// Generic function for the user give some input
const askUser = (str) => window.prompt(str);

// HTML: part1- login page; part2- profile page
let htmlObj = {
    part1: `
<div class="initial">
                <div class="generic__back1 initial__first">
                    <i class="fab fa-instagram initial__icon"></i>
                    <h1 class="initial__title">Instagram</h1>
                    <form class="initial__box">
                        <p class="generic__text">Email</p>
                        <input
                            type="email"
                            class="generic__input"
                            placeholder="Email"
                            id="dom__email"
                        />
                    </form>
                    <form class="initial__box">
                        <p class="generic__text">Password</p>
                        <input
                            type="text"
                            class="generic__input"
                            placeholder="Password"
                            id="dom__pass"
                        />
                    </form>
                    <form
                        class="initial__box dom__display-off"
                        id="dom__name-div"
                    >
                        <p class="generic__text">Name</p>
                        <input
                            type="text"
                            class="generic__input"
                            placeholder="Name"
                            id="dom__name"
                        />
                    </form>
                    <form
                        class="initial__box dom__display-off"
                        id="dom__id-div"
                    >
                        <p class="generic__text">ID/Username</p>
                        <input
                            type="text"
                            class="generic__input"
                            placeholder="Username"
                        />
                    </form>

                    <button
                        class="generic__button1"
                        id="dom__submit"
                        onclick="submit()"
                    >
                        Submit
                    </button>
                </div>

                <div class="generic__back1 initial__second">
                    <form class="initial__checkbox-div">
                        <p class="initial__checkbox-text">Log in</p>
                        <input
                            type="checkbox"
                            class="initial__checkbox"
                            id="initial__log-in-check"
                            onclick="logInDom()"
                            checked
                        />
                    </form>
                    <form class="initial__checkbox-div">
                        <p class="initial__checkbox-text">Sign Up</p>
                        <input
                            type="checkbox"
                            class="initial__checkbox"
                            id="initial__sign-up-check"
                            onclick="signUpDom()"
                        />
                    </form>
                </div>
            </div>`,

    part2: `
<div class="logged generic__back1">
                <form action="" class="logged__nav-bar">
                    <button
                        class="generic__button1"
                        type="button"
                        onclick="myProfile()"
                    >
                        My Profile
                    </button>
                    <button
                        class="generic__button1"
                        type="button"
                        onclick="logOut()"
                    >
                        Log Out
                    </button>
                </form>

                <form class="logged__search-bar">
                    <input
                        type="email"
                        class="generic__input"
                        placeholder="User's email"
                        id="dom__search-email"
                    />
                    <div class="logged__search-bar__buttons">
                        <button
                            class="generic__button1"
                            type="button"
                            onclick="search()"
                        >
                            Search
                        </button>
                        <button
                            class="generic__button1"
                            type="button"
                            onclick="follow()"
                        >
                            Follow
                        </button>
                    </div>
                </form>

                <form action="" class="logged__publish-bar">
                    <p class="generic__text">Photo URL</p>
                    <input
                        type="url"
                        class="generic__input"
                        id="dom__photo-url"
                    />
                    <p class="generic__text logged__description-text">
                        Description
                    </p>
                    <input
                        type="text"
                        class="generic__input logged__description-input"
                        id="dom__photo-desc"
                    />
                    <button
                        class="generic__button1 logged__publish-btn"
                        onclick="publish()"
                        type="button"
                    >
                        Publish
                    </button>
                </form>

                <div class="logged__profile">
                    <div class="logged__profile-div">
                        <p class="logged__profile__text">
                            Name: <span id="dom__profile-name"></span>
                        </p>
                    </div>
                    <div class="logged__profile-div">
                        <p class="logged__profile__text">
                            Followers: <span id="dom__profile-followers"></span>
                        </p>
                    </div>
                    <div class="logged__profile-div">
                        <p class="logged__profile__text">
                            Following: <span id="dom__profile-following"></span>
                        </p>
                    </div>
                </div>
                <div id="dom__back-img"></div>
            </div>
        
`,
};

// DOM variables
let domBackImg = document.querySelector(`#dom__back-img`);
let domMargin = document.querySelector(".margin");

//Default HTML
domMargin.innerHTML = htmlObj.part1;

// Function that update status of profile
const showInformation = (index) => {
    document.querySelector("#dom__profile-name").innerHTML = memory[index].name;
    document.querySelector("#dom__profile-followers").innerHTML =
        memory[index].followers;
    document.querySelector("#dom__profile-following").innerHTML =
        memory[index].following;
};

// COMMAND LOG IN
const logIn = () => {
    let index = -1;
    let email;
    let pass;

    //If is someone already online
    if (online) {
        alert("You are already logged in");
        return;
    }

    email = document.querySelector("#dom__email").value;
    email = email.trim();
    pass = document.querySelector("#dom__pass").value;

    // Check if email exist in memory
    const checkEmail = () => {
        for (let i = 0; i < memory.length; i++) {
            if (memory[i].email === email) {
                index = i;
            }
        }
    };
    checkEmail();

    //If email doesn't exist
    if (index < 0) {
        alert("We don't have that account");
        return;
    }

    //If the password isn't correct
    if (index > -1) {
        if (memory[index].password !== pass) {
            alert("The password is incorrect");
            return;
        }
    }

    online = true;
    //Save outside this function the index in memory of the user that logged
    indexUser = index;
    alert(`Welcome, ${memory[index].name}.`);

    domMargin.innerHTML = htmlObj.part2;
    showInformation(indexUser);
    return;
};

// COMMAND SIGN UP
const signUp = () => {
    let name;
    let email;
    let password = document.querySelector("#dom__pass").value;
    let stop = false;

    //Check if someone is online
    if (online) {
        alert("log out first before you create a new account");
        return true;
    }

    name = document.querySelector("#dom__name").value;
    email = document.querySelector("#dom__email").value.trim("");

    let emailLoop = () => {
        //Command for exit askEmail
        if (/^exit\*/gi.test(email)) {
            stop = true;
            return false;
        }

        //Check if is a valid email
        if (
            !/^([a-zA-Z0-9\_]+\@[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+)|^([a-zA-Z0-9\_]+\@[a-zA-Z]+\.[a-zA-Z]+)/.test(
                email
            )
        ) {
            alert("Insert a valid email");
            return true;
        }

        //Check if email already exist
        const emailExist = () => {
            let n = 0;
            for (let i = 0; i < memory.length; i++) {
                if (memory[i].email === email) {
                    n = 1;
                }
            }
            console.log({ memory });
            if (n === 1) {
                alert("Sorry, that email is already taken");
                return true;
            }
        };
        if (emailExist()) {
            return true;
        }
    };
    if (emailLoop()) {
        return;
    }

    if (stop === true) {
        return;
    }

    // Create a new user based on User class
    const newProfile = new User(name, email, password);

    alert("Thank you for your registration, welcome!");

    memory.push(newProfile);
    return;
};

// COMMAND SEARCH
const search = () => {
    let index = -1;
    let email;
    domBackImg = document.querySelector(`#dom__back-img`);
    domBackImg.classList.add("logged__back-img");

    //Check if User is logged
    const log0 = () => {
        if (online === false) {
            alert("Sorry, you have to be logged in to use that functionality");
            return true;
        }
    };
    if (log0()) {
        return;
    }

    email = document.querySelector("#dom__search-email").value.trim("");

    // Check if email exist in memory
    const checkEmail = () => {
        for (let i = 0; i < memory.length; i++) {
            if (memory[i].email === email) {
                index = i;
            }
        }

        //If it doesn't
        if (index < 0) {
            alert("We have no results for that query");
            return true;
        }
    };
    if (checkEmail()) {
        return;
    }

    showInformation(index);

    console.log(index);

    memory[index].html
        ? (domBackImg.innerHTML = memory[index].html)
        : alert("Don't have any image!");
};

// COMMAND LOG OUT
const logOut = () => {
    domBackImg = document.querySelector(`#dom__back-img`);

    if (online === false) {
        alert("Sorry, you have to be logged in to use that functionality");
        return;
    }

    online = false;

    alert("You logged out, see you later");

    // Remove HTML of the images
    domBackImg.classList.remove("logged__back-img");
    domBackImg.innerHTML = "";
    domMargin.innerHTML = htmlObj.part1;
    return;
};

// COMMAND FOLLOW
const follow = () => {
    let index = -1;
    let followEmail = document
        .querySelector("#dom__search-email")
        .value.trim("");

    if (online === false) {
        alert("Sorry, you have to be logged in to use that functionality");
        return;
    }

    //Check if email already exist
    const emailExist = () => {
        for (let i = 0; i < memory.length; i++) {
            if (memory[i].email === followEmail) {
                index = i;
            }
        }

        if (index === -1) {
            alert("That user does not exist");
            return true;
        }
    };
    if (emailExist()) {
        return;
    }

    // Add 1 follower to the user that was search
    memory[index].followers++;

    // Add 1 following to the User
    memory[indexUser].following++;

    alert(`You now follow ${memory[index].name}`);
    showInformation(indexUser);
    return;
};

const publish = () => {
    if (indexUser === -1) {
        alert("Do login first!");
        return;
    }

    const url = document.querySelector("#dom__photo-url").value;
    const desc = document.querySelector("#dom__photo-desc").value;
    domBackImg = document.querySelector(`#dom__back-img`);

    if (memory[indexUser].html) {
        memory[indexUser].html =
            `
            <div class="logged__img-box">
                <img
                    src="${url}"
                    alt=""class="logged__img" />
                <p class="logged__img-desc">${desc}</p>
            </div>` + memory[indexUser].html;
        domBackImg.innerHTML = memory[indexUser].html;
    }

    if (!memory[indexUser].html) {
        console.log(domBackImg);

        domBackImg.classList.add("logged__back-img");

        memory[indexUser].html = `
            <div class="logged__img-box">
            <img
                src="${url}"
                alt=""class="logged__img" />
                <p class="logged__img-desc">${desc}</p>
                </div>`;
        domBackImg.innerHTML = memory[indexUser].html;
    }
    return;
};

const logInDom = () => {
    document.querySelector("#initial__sign-up-check").checked = false;
    document.querySelector("#dom__name-div").classList.add("dom__display-off");
    document.querySelector("#dom__id-div").classList.add("dom__display-off");
};

const signUpDom = () => {
    document.querySelector("#initial__log-in-check").checked = false;
    document
        .querySelector("#dom__name-div")
        .classList.remove("dom__display-off");
    document.querySelector("#dom__id-div").classList.remove("dom__display-off");
};

const submit = () => {
    if (document.querySelector("#initial__sign-up-check").checked) {
        signUp();
    }

    if (document.querySelector("#initial__log-in-check").checked) {
        logIn();
    }
};

const myProfile = () => {
    showInformation(indexUser);

    domBackImg.innerHTML = memory[indexUser].html;
};
