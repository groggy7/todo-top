const { v4: uuidv4 } = require('uuid');

export default class Task {
    constructor(title, description, dueDate, priority, projectID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectID = projectID;
        this.done = false;
        this.uniqueKey = `task_${uuidv4()}`;
        localStorage.setItem(this.uniqueKey, JSON.stringify(this));
    }

    static Delete(uniqueKey) {
        localStorage.removeItem(uniqueKey);
    }

    static DeleteProjectTasks(projectID) {
        const taskList = Task.GetTaskList();
        taskList.forEach(task => {
            if (task.projectID === projectID) {
                Task.Delete(task.uniqueKey);
            }
        });
    }
    static Update(uniqueKey, title, description, dueDate, priority, projectID) {
        const taskData = JSON.parse(localStorage.getItem(uniqueKey));
    
        if (taskData) {
            taskData.title = title;
            taskData.description = description;
            taskData.dueDate = dueDate;
            taskData.priority = priority;
            taskData.projectID = projectID;
            localStorage.setItem(uniqueKey, JSON.stringify(taskData));
        } else {
            console.error(`task item with key ${uniqueKey} not found.`);
        }
    }

    static Complete(uniqueKey) {
        const taskData = JSON.parse(localStorage.getItem(uniqueKey));
        taskData.done = true;
        localStorage.setItem(uniqueKey, JSON.stringify(taskData));
    }

    static Uncomplete(uniqueKey) {
        const taskData = JSON.parse(localStorage.getItem(uniqueKey));
        taskData.done = false;
        localStorage.setItem(uniqueKey, JSON.stringify(taskData));
    }

    static GetTaskList() {
        const taskList = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("task_")) {
                try {
                    const taskData = JSON.parse(localStorage.getItem(key));
                    if (ValidatetaskItem(taskData)) {
                        taskList.push(taskData);
                    } else {
                        console.log("Non to-do item returned from local storage: ", taskData);
                    }
                } catch (e) {
                    console.error("Error parsing JSON from local storage for key:", key, e);
                }
            }
        }
    
        return taskList;
    }
}

function ValidatetaskItem(task) {
    return task && typeof task.title === 'string' &&
           typeof task.description === 'string' &&
           typeof task.dueDate === 'string' &&
           typeof task.priority === 'string';
}