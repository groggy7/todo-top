import { v4 as uuidv4 } from 'uuid';

export default class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
        this.uniqueKey = `project_${uuidv4()}`;
        localStorage.setItem(this.uniqueKey, JSON.stringify(this));
    }

    static Delete(uniqueKey) {
        localStorage.removeItem(uniqueKey);
    }

    AddTodo(todo) {
        this.todoList.push(todo);
        localStorage.setItem(this.uniqueKey, JSON.stringify(this));
    }

    DeleteToDo(title) {
        const index = this.todoList.findIndex(todo => todo.title === title);
        if (index !== -1) {
            this.todoList = this.todoList.splice(index, 1);
            localStorage.setItem(this.uniqueKey, JSON.stringify(this));
            return updatedTodoList;
        }
        return null;
    }

    GetTodoList() {
        return this.todoList;
    }

    static GetProjectList() {
        const projectList = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("project_")) {
                try {
                    const projectData = JSON.parse(localStorage.getItem(key));
                    if (ValidateProjectItem(projectData)) {
                        projectList.push(projectData);
                    } else {
                        console.log("Non project item returned from local storage: ", projectData);
                    }
                } catch (e) {
                    console.error("Error parsing JSON from local storage for key:", key, e);
                }
            }
        }
        
        return projectList;
    }
}

function ValidateProjectItem(project) {
    return typeof project.name === 'string' &&
           typeof project.todoList === 'object';
}

