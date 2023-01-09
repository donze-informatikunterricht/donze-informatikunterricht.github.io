"use strict;"

let mode = "#home";

document.getElementById("home").addEventListener("click", showContent);
document.getElementById("scratchgames").addEventListener("click", showContent);
document.getElementById("todo").addEventListener("click", showContent);
document.getElementById("memory").addEventListener("click", showContent);
document.getElementById("learningcards").addEventListener("click", showContent);
document.getElementById("binhex").addEventListener("click", showContent);
document.getElementById("contact").addEventListener("click", showContent);

document.getElementById("dropbtn").addEventListener("mouseover", handleMouseover);
document.getElementById("dropbtn").addEventListener("mouseout", handleMouseout);
document.getElementsByClassName("dropdown-content")[0].addEventListener("mouseout", handleMouseout);
document.getElementById("dropbtn").addEventListener("focusout", (e)=>{console.log("...",e)})

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
    return parentWithClassInNavbar(el.parentElement, className);
}

function handleMouseout(e) {
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
    // console.log("hiding", mode+'content...');
    document.querySelector(mode+'-content').classList.add("invisible");
    document.getElementById(mode.substring(1)).classList.remove("active");
}

function showContent(e) {
    // e.target is the menu element receiving the click event
    hideLastShown()
    let element = document.getElementById(e.target.id + "-content"); // e.g. home-content
    element.classList.remove("invisible");
    mode = "#" + e.target.id; // e.g. #home
    element.classList.add("visible"); // Content visible
    e.target.classList.add("active"); // Menu Element active
}
