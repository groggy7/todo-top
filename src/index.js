import ToDo from "./todo/todo.js";
import Project from "./project/project.js";
import "./style.css";
import '@fortawesome/fontawesome-free/css/all.css';

const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

const viewContent = document.createElement("div");
viewContent.classList.add("view-content");
main.appendChild(viewContent);

const sidebarInfo = document.createElement("div");
sidebarInfo.classList.add("sidebar-info");
sidebarInfo.innerHTML = `
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 45.532 45.532"xml:space="preserve"><g><path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"/></g></svg>    
    <span>John Doe</span>
    <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887Zm10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5c-1.571 0-2.8.656-3.618 1.883-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723-.074.081-.15.166-.232.261-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557-.082-.095-.158-.18-.232-.261-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884ZM14 17.5h-4a2 2 0 1 0 4 0Z" clip-rule="evenodd"></path></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z" clip-rule="evenodd"></path></svg>
`;

sidebar.appendChild(sidebarInfo);

const addTask = document.createElement("div");
addTask.classList.add("add-task", "sidebar-item");
addTask.innerHTML = `
    <i class="fa-solid fa-plus fa-lg"></i>
    <span>Add Task</span>
`;

const today = document.createElement("div");
today.classList.add("today", "sidebar-item");
today.innerHTML = `
    <i class="fa-solid fa-calendar-week fa-lg"></i>
    <span>Today</span>
`;

const thisWeek = document.createElement("div");
thisWeek.classList.add("this-week", "sidebar-item");
thisWeek.innerHTML = `
   <i class="fa-solid fa-calendar-days fa-lg"></i>
    <span>This Week</span>
`;

const allTasks = document.createElement("div");
allTasks.classList.add("all-tasks", "sidebar-item");
allTasks.innerHTML = `
    <i class="fa-solid fa-list-check fa-lg"></i>
    <span>All Tasks</span>
`;

const projects = document.createElement("div");
projects.classList.add("projects");
projects.innerHTML = `
    <span>My Projects</span>
    <i class="fa-regular fa-plus fa-sm"></i>
`;

sidebar.appendChild(addTask);
sidebar.appendChild(today);
sidebar.appendChild(thisWeek);
sidebar.appendChild(allTasks);
sidebar.appendChild(projects);

let projectList = Project.GetProjectList();
console.log(projectList);
projectList.forEach(project => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item", "sidebar-item");
    projectItem.innerHTML = `
        <i class="fa-solid fa-folder fa-lg"></i>
        <span>${project.name}</span>
`;
    sidebar.appendChild(projectItem);
});

const sidebarItems = document.querySelectorAll(".sidebar-item");

sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        sidebarItems.forEach(item => {
            item.classList.remove("active");
        });
        item.classList.add("active");

        if (item.classList.contains("today")) {
            currentView = 'today';
            loadTodayTodos();
        } else if (item.classList.contains("this-week")) {
            currentView = 'this-week';
            loadThisWeekTodos();
        } else {
            currentView = 'all';
            loadAllTodos();
        }
    });
});

let currentView = 'today'; 

function loadTodayTodos() {
    main.innerHTML = "";
    viewContent.innerHTML = "";

    const todayContainer = document.createElement("div");
    todayContainer.classList.add("today-container");
    viewContent.appendChild(todayContainer);

    const today = new Date();
    const todoList = ToDo.GetToDoList();

    const todaysTodos = todoList.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return dueDate.getDay() === today.getDay();
        }
    );

    todayContainer.innerHTML = `
    <div class="today-header">
        Today
    </div>
    <div class="today-task-count">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" class="siIBvPn"><path fill="currentColor" fill-rule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clip-rule="evenodd"></path></svg>
        <span>${todaysTodos.length} tasks</span>
    </div>
    `;

    todaysTodos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div class="todo-checkbox">
                <label class="custom-checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="todo-content">
                <div class="todo-title">
                    <span>${todo.title}</span>
                </div>
                <div class="todo-description">
                    <span>${todo.description}</span>
                </div>
                <div class="todo-due-hour">
                    <span>${todo.dueDate}</span>
                    <hr>
                </div>
            </div>
            <div class="todo-actions">
                <i class="fa-solid fa-trash-can" data-id="${todo.uniqueKey}"></i>
            </div>
        `;
        todayContainer.appendChild(todoItem);
    });
    main.appendChild(viewContent);
}

function loadThisWeekTodos() {
    main.innerHTML = "";
    viewContent.innerHTML = "";

    const thisWeekContainer = document.createElement("div");
    thisWeekContainer.classList.add("this-week-container");
    viewContent.appendChild(thisWeekContainer);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    const todoList = ToDo.GetToDoList();
    const thisWeekTodos = todoList.filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
    });

    thisWeekContainer.innerHTML = `
    <div class="today-header">
        This Week
    </div>
    <div class="today-task-count">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" class="siIBvPn"><path fill="currentColor" fill-rule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clip-rule="evenodd"></path></svg>
        <span>${thisWeekTodos.length} tasks</span>
    </div>
    `;

    thisWeekTodos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div class="todo-checkbox">
                <label class="custom-checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="todo-content">
                <div class="todo-title">
                    <span>${todo.title}</span>
                </div>
                <div class="todo-description">
                    <span>${todo.description}</span>
                </div>
                <div class="todo-due-hour">
                    <span>${todo.dueDate}</span>
                    <hr>
                </div>
            </div>
            <div class="todo-actions">
                <i class="fa-solid fa-trash-can" data-id="${todo.uniqueKey}"></i>
            </div>
        `;
        thisWeekContainer.appendChild(todoItem);
    });
    main.appendChild(viewContent);
}

function loadAllTodos() {
    main.innerHTML = "";
    viewContent.innerHTML = "";

    const allTodosContainer = document.createElement("div");
    allTodosContainer.classList.add("all-todos-container");
    viewContent.appendChild(allTodosContainer);

    const todoList = ToDo.GetToDoList();

    allTodosContainer.innerHTML = `
        <div class="today-header">
            All Tasks
        </div>
        <div class="today-task-count">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" class="siIBvPn"><path fill="currentColor" fill-rule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clip-rule="evenodd"></path></svg>
            <span>${todoList.length} tasks</span>
        </div>
    `;

    todoList.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div class="todo-checkbox">
                <label class="custom-checkbox">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="todo-content">
                <div class="todo-title">
                    <span>${todo.title}</span>
                </div>
                <div class="todo-description">
                    <span>${todo.description}</span>
                </div>
                <div class="todo-due-hour">
                    <span>${todo.dueDate}</span>
                    <hr>
                </div>
            </div>
            <div class="todo-actions">
                <i class="fa-solid fa-trash-can" data-id="${todo.uniqueKey}"></i>
            </div>
        `;
        allTodosContainer.appendChild(todoItem);
    });
    main.appendChild(viewContent);
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash-can')) {
        const todoId = event.target.getAttribute('data-id');

        ToDo.Delete(todoId);
        refreshCurrentView();
    }
});

function refreshCurrentView() {
    if (currentView === 'today') {
        loadTodayTodos();
        sidebarItems[1].classList.add('active');
    } else if (currentView === 'this-week') {
        loadThisWeekTodos();
        sidebarItems[2].classList.add('active');
    } else {
        loadAllTodos();
        sidebarItems[3].classList.add('active');
    }
}

refreshCurrentView();

document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.querySelector('.custom-checkbox input');
    const checkmark = document.querySelector('.checkmark');

    if (checkbox && checkmark) {
        checkmark.addEventListener('mouseover', function() {
            if (!checkbox.checked) {
                this.style.borderColor = '#2196F3';
            }
        });

        checkmark.addEventListener('mouseout', function() {
            if (!checkbox.checked) {
                this.style.borderColor = '#ccc';
            }
        });

        checkmark.addEventListener('click', function(event) {
            event.preventDefault();
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                this.style.borderColor = '#2196F3';
            } else {
                this.style.borderColor = '#ccc';
            }
        });
    }
});