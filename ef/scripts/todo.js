"use strict";

// Selectors
document.getElementById('todo-form').addEventListener('submit', handleSubmitForm);
document.getElementById('todo-ul').addEventListener('click', handleButtonClickDeleteOrCheck);
document.getElementById('clearList').addEventListener('click', handleClearList);

// Event Handlers
// takes: e: event object
function handleSubmitForm(e) {
    e.preventDefault(); // Prevent browser's default handling of form submit event
    let inputElement = document.getElementById('todo-input');
    if (inputElement.value != '') {
        addTodo(inputElement.value);
    }
    inputElement.value = '';
}

function handleButtonClickDeleteOrCheck(e) {
    console.log(e.target);
    if (e.target.name == 'checkButton') {
        checkTodo(e);
    }
    if (e.target.name == 'deleteButton') {
        deleteTodo(e);
    }
}

function handleClearList() {
    let ulElement = document.getElementById('todo-ul');
    ulElement.innerHTML = '';
}

// Helper Functions
function addTodo(todo) {
    let ulElement = document.getElementById('todo-ul');
    let liElement = document.createElement('li');

    liElement.innerHTML = `
        <span class="todoItem">${todo}</span>
        <button name="checkButton">✔️</button>
        <button name="deleteButton">🗑</button>
    `;
    //liElement.classList.add('todo-li')

    liElement.classList.add('todo-list-item');
    ulElement.appendChild(liElement)
}

function checkTodo(e) {
    let htmlItem = e.target.parentNode.children[0]; /* The li Element has 3 children, the text and the buttons. */
    if (htmlItem.style.textDecoration == 'line-through') {
        htmlItem.style.textDecoration = 'none';
    } else {
        htmlItem.style.textDecoration = 'line-through';
    }
}

function deleteTodo(e) {
    let htmlItem = e.target.parentNode;
    
    //htmlItem.remove();

    htmlItem.addEventListener('transitionend', function() {
        htmlItem.remove();
    })

    htmlItem.classList.add('todo-list-item-fall');

}