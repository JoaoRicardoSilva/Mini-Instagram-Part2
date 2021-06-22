"use strict";
const displayOn = () => {
    const signUp = document.querySelector("#initial__sign-up");
    const initialNameId = document.querySelector(".initial__name-id");

    if (signUp.checked) {
        initialNameId.classList.remove(".dom__display-off");
    }
};
