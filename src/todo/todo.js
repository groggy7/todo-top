const { v4: uuidv4 } = require('uuid');

function CreateToDo(name, description, dueDate, priority) {
    return {name, description, dueDate, priority};
}

function SaveToLocalStorage(todo) {
    const uniqueKey = `todo_${uuidv4()}`;
    localStorage.setItem(uniqueKey, JSON.stringify(todo));
}

function ValidateToDoItem(todo) {
    return todo && typeof todo.name === 'string' &&
           typeof todo.description === 'string' &&
           typeof todo.dueDate === 'string' &&
           typeof todo.priority === 'string';
}

function GetToDoList() {
    const todoList = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("todo_")) {
            try {
                const todoData = JSON.parse(localStorage.getItem(key));
                if (ValidateToDoItem(todoData)) {
                    todoList.push(todoData);
                } else {
                    console.log("Non to-do item returned from local storage: ", todoData);
                }
            } catch (e) {
                console.error("Error parsing JSON from local storage for key:", key, e);
            }
        }
    }

    return todoList;
}

export {CreateToDo, SaveToLocalStorage, GetToDoList};