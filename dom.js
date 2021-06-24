"use strict";

// Log in/Sign up area

const logIn = () => {
    document.querySelector("#initial__sign-up-check").checked = false;
    document.querySelector("#dom__name").classList.add("dom__display-off");
    document.querySelector("#dom__id").classList.add("dom__display-off");
};

const signUp = () => {
    document.querySelector("#initial__log-in-check").checked = false;
    document.querySelector("#dom__name").classList.remove("dom__display-off");
    document.querySelector("#dom__id").classList.remove("dom__display-off");
};

const submit = () => {
    if (document.querySelector("#initial__sign-up-check").checked) {
        signUp();
    }

    if (document.querySelector("#initial__log-in-check").checked) {
    }
};
