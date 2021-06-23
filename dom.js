"use strict";

// Log in/Sign up area

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
