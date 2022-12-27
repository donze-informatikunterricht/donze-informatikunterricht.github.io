document.getElementById("home").addEventListener("click", showHome);
document.getElementById("pong").addEventListener("click", showPong);
document.getElementById("todo").addEventListener("click", showTodo);
document.getElementById("memory").addEventListener("click", showMemory);
document.getElementById("learningcards").addEventListener("click", showLearningCards);
document.getElementById("binhex").addEventListener("click", showBinHex);
document.getElementById("contact").addEventListener("click", showContact);

document.getElementById("dropbtn").addEventListener("mouseover", handleMouseover);
document.getElementById("dropbtn").addEventListener("mouseout", handleMouseout);
document.getElementsByClassName("dropdown-content")[0].addEventListener("mouseout", handleMouseout);
document.getElementById("dropbtn").addEventListener("focusout", (e)=>{console.log("...",e)})


// Navbar object ids:
// home Beschreibung
// memory
// todo
// learning-cards
// contact

let mode = "#home";

function handleMouseover(e) {
    e.srcElement.parentElement.classList.add("visible");
}

function parentWithClassInNavbar(el, className) {
    if (el == null) {
        return el;
    }
    if (el.classList.contains(className)) {
        return el;
    }
    if (el.classList.contains("navbar")) {
        return el;
    }
    console.log(el.parentElement)
    return parentWithClassInNavbar(el.parentElement, className);
}

function handleMouseout(e) {
    //console.log("handleMouseout", e)
    //console.log(e.fromElement, e.toElement)
    let myParent = parentWithClassInNavbar(e.srcElement, "dropdown");
    let toParent = parentWithClassInNavbar(e.toElement, "dropdown");
    if (myParent != toParent) {
        myParent.classList.remove("visible");
    }
}

function closeDropdown(e){
    let myParent = parentWithClassInNavbar(e.srcElement, "dropdown");
    myParent.classList.remove("visible");
}

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

function showTodo(e) {
    console.log("showing Todo...")
    closeDropdown(e)
    hideLastShown()
    document.querySelector('#todo-content').classList.remove("invisible");
    mode = "#todo";
}

function showPong(e) {
    console.log("showing Memory...")
    closeDropdown(e)
    hideLastShown()
    document.querySelector('#pong-content').classList.remove("invisible");
    mode = "#pong";
}

function showMemory(e) {
    console.log("showing Memory...")
    closeDropdown(e)
    hideLastShown()
    document.querySelector('#memory-content').classList.remove("invisible");
    mode = "#memory";
}

function showLearningCards(e) {
    console.log("showing Learning Cards...")
    closeDropdown(e)
    hideLastShown()
    document.querySelector('#learningcards-content').classList.remove("invisible");
    mode = "#learningcards";
}

function showBinHex(e) {
    console.log("showing Bin Hex Intro...")
    closeDropdown(e)
    hideLastShown()
    document.querySelector('#binhex-content').classList.remove("invisible");
    mode = "#binhex";
}


function showContact() {
    console.log("showing Contact...")
    hideLastShown()
    document.querySelector('#contact-content').classList.remove("invisible");
    mode = "#contact";
}

