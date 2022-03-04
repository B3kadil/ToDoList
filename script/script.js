//Selectors
const inputToDo = document.querySelector('.inputToDo');
const inputBtn = document.querySelector('.btnInput');
const tasks = document.querySelector('.tasks');
const darkMode = document.querySelector(".darkLightMode")
const filterOption = document.querySelector(".filter-todo")
const lists = document.querySelector('.list')
    //Event Listeners
inputBtn.addEventListener('click', addTodo);
tasks.addEventListener('click', deleteCheck)
darkMode.addEventListener("click", Dark);
filterOption.addEventListener('click', filterToDo)
    //Functions
function addTodo(event) {
    let str = inputToDo.value;
    if (str.trim() == "") {
        alert('invalid')
        setTimeout(function() {
            location.reload();
        }, time);
        inputToDo.value = "";
    } else
        event.preventDefault();
    //to create a div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //to do a li
    const todoLi = document.createElement('li');
    todoLi.innerText = inputToDo.value;
    todoDiv.appendChild(todoLi);
    //to do a buttons("delete" and "checked")
    const todoBtnCheck = document.createElement('button');
    todoBtnCheck.innerHTML = '<i class="fas fa-check"></i>';
    todoBtnCheck.classList.add('complete-btn');
    todoDiv.appendChild(todoBtnCheck);

    const todoBtnDlt = document.createElement('button');
    todoBtnDlt.innerHTML = '<i class="fa-solid fa-minus"></i>';
    todoBtnDlt.classList.add('delete-btn');
    todoDiv.appendChild(todoBtnDlt);
    //append to list
    const list = document.querySelector('#list');
    list.appendChild(todoDiv);
    //clear inputToDo
    inputToDo.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('fall')
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }
    //checked
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}


//DarkLightMode
let dark = localStorage.getItem("darkMode")
const enableDarkmode = () => {
    document.body.classList.add('dark')
    localStorage.setItem('dark', 'enabled')
}
const disenableDarkmode = () => {
    document.body.classList.remove('dark')
    localStorage.setItem('dark', null)
}

function Dark() {
    dark = localStorage.getItem('dark');
    if (dark !== 'enabled') {
        enableDarkmode();
        document.querySelector('body').style.background = 'linear-gradient(to right, #232526, #414345)';
        document.querySelector('.container').style.backgroundColor = '#657889'
        document.querySelector('.name').style.color = 'white'
        document.querySelector('.btnInput').style.backgroundColor = 'gray'
        document.querySelector('.btnInput').style.color = 'white'
        darkMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
        darkMode.style.backgroundColor = 'gray'
        console.log('dark on')
    } else {
        disenableDarkmode();
        document.querySelector('body').style.background = 'linear-gradient(to right, #FFAFBD, #C9FFBF)';
        document.querySelector('.container').style.backgroundColor = '#dee8ec'
        document.querySelector('.name').style.color = 'black'
        document.querySelector('.btnInput').style.backgroundColor = '#fccfd7'
        document.querySelector('.btnInput').style.color = 'black'
        darkMode.innerHTML = '<i class="fa-solid fa-sun"></i>'
        darkMode.style.backgroundColor = 'white'
        console.log('dark off')
    }
}


//filter todo
function filterToDo(e) {
    const todos = lists.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}