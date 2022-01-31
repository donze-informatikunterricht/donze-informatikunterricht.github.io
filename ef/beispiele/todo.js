// Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('.todo-ul').addEventListener('click', handleButtonClickDeleteOrCheck);
document.querySelector('.clearList').addEventListener('click', handleClearList);

// Event Handlers
// takes: e: event object
function handleSubmitForm(e) {
    e.preventDefault(); // The browser's default handling of a form submit event
    let input = document.querySelector('input');
    if (input.value != '') {
        addTodo(input.value);
    }
    input.value = '';
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

function handleClearList(e) {
    console.log("Here I am, this is me, there's nowhere in the world I'd rather be...")
    let ul = document.querySelector('.todo-ul');
    ul.innerHTML = '';
}

// Helper Functions
function addTodo(todo) {
    let ul = document.querySelector('.todo-ul');
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="todoItem">${todo}</span>
        <button name="checkButton">✔️</button>
        <button name="deleteButton">🗑</button>
    `;
    //li.classList.add('todo-li')

    li.classList.add('todo-list-item');
    ul.appendChild(li)
}

function checkTodo(e) {
    let htmlItem = e.target.parentNode;
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