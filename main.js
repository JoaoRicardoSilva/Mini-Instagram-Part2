"use strict";

// Base class for new Users
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.followers = 0;
        this.following = 0;
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
    email = document.querySelector("#dom__email").value;
    email = email.trim();

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
            alert("");
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
                alert("");
                return true;
            }
        };
        if (emailExist()) {
            return true;
        }
    };

    while (emailLoop()) {
        email = askUser("Enter your email!");
    }

    if (stop === true) {
        return;
    }

    // Create a new user based on User class
    const newProfile = new User(name, email, password);

    alert("Thank you for your registration, welcome!");

    loggedArea.html;

    memory.push(newProfile);
    return;
};

// COMMAND EXIT
const exit = () => alert("You left the program, bye");

// COMMAND SEARCH
const search = () => {
    let index = -1;
    let email;

    //Check if User is logged
    const log0 = () => {
        if (online === false) {
            alert("Sorry, you have to be logged in to use that functionality");
            alert("");
            return true;
        }
    };
    if (log0()) {
        return;
    }

    email = askUser("Enter your email").trim();

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

    alert(
        `${memory[index].name}\n${memory[index].email}\nFollowers: ${memory[index].followers}\nFollowing: ${memory[index].following}`
    );
    alert("");
};
// COMMAND LOG OUT
const logOut = () => {
    if (online === false) {
        alert("Sorry, you have to be logged in to use that functionality");
        alert("");
        return;
    }

    online = false;

    alert("You logged out, see you later");
    alert("");
    return;
};

// Command Follow
const follow = () => {
    if (online === false) {
        alert("Sorry, you have to be logged in to use that functionality");
        alert("");
        return;
    }

    const followEmail = askUser(
        "What's the email of the person that you want to folloW?"
    );
    let index = -1;

    //Check if email already exist
    const emailExist = () => {
        for (let i = 0; i < memory.length; i++) {
            if (memory[i].email === followEmail) {
                index = i;
            }
        }

        if (index === -1) {
            alert("That user does not exist");
            alert("");
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
    alert("");
};

// CHECK AND EXECUTE THE COMMANDS
const commandsSwitch = () => {
    // Get the command from the user
    let command = askUser("What's your command?");
    console.log({ command });
    const regex = command.match(/^([a-zA-Z]+ [a-zA-Z]+)|([a-zA-Z]+)/g);
    console.log(regex);

    switch (regex[0].toLowerCase()) {
        case "log in":
            logIn();
            console.log({ memory });
            commandsSwitch();
            break;
        case "sign up":
            signUp();
            console.log({ memory });
            commandsSwitch();
            break;
        case "exit":
            exit();
            break;
        case "search":
            search();
            console.log({ memory });
            commandsSwitch();
            break;
        case "log out":
            logOut();
            console.log({ memory });
            commandsSwitch();
            break;
        case "follow":
            follow();
            console.log({ memory });
            commandsSwitch();
            break;

        default:
            window.alert("We don't have that option");
            alert("");
            commandsSwitch();
            break;
    }
};
// commandsSwitch();
