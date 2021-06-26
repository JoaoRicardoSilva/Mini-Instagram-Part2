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

// COMMAND EXIT
const exit = () => alert("You left the program, bye");
