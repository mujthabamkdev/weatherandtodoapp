export const addTodo = async (todos, text) => {
    const newTodo = {
        id: crypto.randomUUID(),
        text: text,
        isCompleted: false
    }
    try {
        let response = await fetch("http://localhost:3000/todos", {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        todos = [...todos, response];
    } catch (error) {
        console.log(error);
    }
    return todos;
};

export const removeTodo = async (todos, todoId) => {
    try {
        await fetch(`http://localhost:3000/todos/${todoId}`, { method: 'DELETE' });
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
};

export const toggleTodo = async (todos, todoId) => {
    const todoItem = todos.find(item => item.id === todoId);
    const newItem = { ...todoItem, isCompleted: !todoItem.isCompleted };
    try {
        if (!newItem) {
            throw new Error(`Todo item with ID ${todoId} not found`);
        }
        let response = await fetch(`http://localhost:3000/todos/${todoId}`, {
            method: 'PUT',
            body: JSON.stringify(newItem),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
};

export const updateTodo = async (todos, todoId, newText) => {
    const newItem = { ...todos.find(item => item.id === todoId), text: newText };
    try {
        if (!newItem) {
            throw new Error(`Todo item with ID ${todoId} not found`);
        }
        let response = await fetch(`http://localhost:3000/todos/${todoId}`, {
            method: 'PUT',
            body: JSON.stringify(newItem),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
};

export const toggleAll = async (todos, isCompleted) => {
    const updatedTodos = todos.map(todo => ({ ...todo, isCompleted: !todo.isCompleted }));
    try {
        const response = await fetch(`http://localhost:3000/todos/`, {
            method: 'PATCH',
            body: JSON.stringify(updatedTodos),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error(`Error updating todos: ${await response.text()}`);
            return false;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
};