import * as helpers from './helpers';

let selectors = {};
let todos = [];
let filter = 'all';

const getTodos = async () => {
    const response = await fetch("http://localhost:3000/todos");
    todos = await response.json();
};

const initialize = async () => {
    await getTodos();
    findElements();
    addListeners();
    render();
}

const findElements = () => {
    selectors = {
        newTodo: document.querySelector(".new-todo"),
        todoList: document.querySelector(".todo-list"),
        footer: document.querySelector(".footer"),
        main: document.querySelector(".main"),
        toggleAll: document.querySelector(".toggle-all"),
        counter: document.querySelector(".todo-count"),
        filters: document.querySelector(".filters")
    };
};

const addListeners = () => {
    selectors.newTodo.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            addTodo(event.target.value);
            selectors.newTodo.value = "";
        }
    });

    selectors.filters.querySelectorAll('li').forEach((li) => {
        li.addEventListener('click', () => {
            filter = li.getAttribute('filter');
            render();
        });
    });
};

const addTodo = async (text) => {
    todos = await helpers.addTodo(todos, text);
    render();
};

const getFilteredTodos = () => {
    if (filter === 'active') {
        return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === 'completed') {
        return todos.filter((todo) => todo.isCompleted);
    } else {
        return todos;
    }
};

const render = () => {
    selectors.todoList.innerHTML = "";
    getFilteredTodos().forEach((todo) => {
        const todoNode = createTodoNode(todo);
        selectors.todoList.appendChild(todoNode);
    });

    selectors.filters.querySelectorAll('a').forEach(a => {
        a.classList.remove('selected');
    });

    selectors.filters.querySelector(`[filter=${filter}] a`)
        .classList.add('selected');
    selectors.footer.style.display = todos.length > 0 ? "block" : "none";
    selectors.main.style.display = todos.length > 0 ? "block" : "none";

    const activeTodosCount = todos.filter(todo => !todo.isCompleted).length;
    selectors.counter.innerHTML = `
    <strong>${activeTodosCount}</strong>
    ${activeTodosCount == 1 ? "item" : "items"} left
    `;

    selectors.toggleAll.addEventListener('click', (event) => {
        toggleAll(event.target.checked);
    });
};

const createTodoNode = (todo) => {
    const node = document.createElement("li");
    if (todo.isCompleted) {
        node.classList.add('completed');
    }
    node.innerHTML = `
    <div class="view"> 
       <input class="toggle" type="checkbox" 
        ${todo.isCompleted ? "checked" : ""}
       />
       <label>${todo.text}</label>
       <button class="destroy"></button>
    </div>
    <input class="edit" value="${todo.text}"/>
    `;

    node.querySelector('.destroy').addEventListener('click',
        () => removeTodo(todo.id));

    node.querySelector('.toggle').addEventListener('click',
        () => toggleTodo(todo.id));

    node.querySelector("label")
        .addEventListener('dblclick', () => startEditing(node));

    node.querySelector(".edit")
        .addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                updateTodo(todo.id, event.target.value);
            } else if (event.key === 'Escape') {
                event.target.value = todo.title;
                render();
            }
        });
    return node;
}

const removeTodo = async (todoId) => {
    const result = await helpers.removeTodo(todos, todoId);
    if (result) {
        await getTodos();
        render();
    }
};

const toggleTodo = async (todoId) => {
    const result = await helpers.toggleTodo(todos, todoId);
    if (result) {
        await getTodos();
        render();
    }
};

const toggleAll = async (checked) => {
    const result = await helpers.toggleAll(todos, checked);
    if (result) {
        await getTodos();
        render();
    }
}

const startEditing = (node) => {
    node.classList.add("editing");
    node.querySelector('.edit').focus();
}

const updateTodo = async (todoId, text) => {
    const result = await helpers.updateTodo(todos, todoId, text);
    if (result) {
        await getTodos();
        render();
    }
};

initialize();