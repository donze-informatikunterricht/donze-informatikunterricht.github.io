//document.querySelector('#home').addEventListener('click', showHome);
//document.querySelector('#memory').addEventListener('click', showMemory);
//document.querySelector('#todo').addEventListener('click', showTodo);
//document.querySelector('#learning-cards').addEventListener('click', showLC);
//document.querySelector('#contact').addEventListener('click', showContact);

document.getElementById("home").addEventListener("click", showHome);
document.getElementById("todo").addEventListener("click", showTodo);
document.getElementById("memory").addEventListener("click", showMemory);
document.getElementById("contact").addEventListener("click", showContact);

// Navbar object ids:
// home Beschreibung
// memory
// todo
// learning-cards
// contact

let mode = "#home";

function hideLastShown() {
    console.log("hiding", mode+'content...');
    document.querySelector(mode+'-content').classList.add("invisible");
}

function showHome() {
    console.log("showing Home...")
    hideLastShown()
    document.querySelector('#home-content').classList.remove("invisible");
    mode = "#home";
}

function showTodo() {
    console.log("showing Todo...")
    hideLastShown()
    document.querySelector('#todo-content').classList.remove("invisible");
    mode = "#todo";
}

function showMemory() {
    console.log("showing Memory...")
    hideLastShown()
    document.querySelector('#memory-content').classList.remove("invisible");
    mode = "#memory";
}

function showContact() {
    console.log("showing Contact...")
    hideLastShown()
    document.querySelector('#contact-content').classList.remove("invisible");
    mode = "#contact";
}
