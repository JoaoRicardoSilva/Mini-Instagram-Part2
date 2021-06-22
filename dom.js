"use strict";

const uncheckSignUp = () => {
    document.querySelector("#initial__sign-up-check").checked = false;
};

const uncheckLogIn = () => {
    document.querySelector("#initial__log-in-check").checked = false;
    document
        .querySelector(".initial__name-id")
        .classList.remove("dom__display-off");
};
