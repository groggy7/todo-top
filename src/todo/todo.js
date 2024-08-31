const { v4: uuidv4 } = require('uuid');

export default class ToDo {
    constructor(title, description, dueDate, priority, projectID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectID = projectID;
        this.uniqueKey = `todo_${uuidv4()}`;
        localStorage.setItem(this.uniqueKey, JSON.stringify(this));
        console.log(this);
    }

    static Delete(uniqueKey) {
        localStorage.removeItem(uniqueKey);
    }

    Update(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        localStorage.setItem(this.uniqueKey, JSON.stringify(this));   
    }

    GetID() {
        return this.uniqueKey;
    }

    static GetToDoList() {
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
}

function ValidateToDoItem(todo) {
    return todo && typeof todo.title === 'string' &&
           typeof todo.description === 'string' &&
           typeof todo.dueDate === 'string' &&
           typeof todo.priority === 'string';
}