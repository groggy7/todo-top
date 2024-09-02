import ToDo from "./todo/todo.js";
import Project from "./project/project.js";
import "./style.css";
import '@fortawesome/fontawesome-free/css/all.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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

const sidebarItems = [
    { class: 'add-task', icon: 'fa-plus', text: 'Add Task' },
    { class: 'inbox', icon: 'fa-inbox', text: 'Inbox' },
    { class: 'today', icon: 'fa-calendar-week', text: 'Today' },
    { class: 'this-week', icon: 'fa-calendar-days', text: 'This Week' },
    { class: 'all-tasks', icon: 'fa-list-check', text: 'All Tasks' }
];

const createSidebarItem = ({ class: itemClass, icon, text }) => {
    const item = document.createElement("div");
    item.classList.add(itemClass, "sidebar-item");
    item.innerHTML = `<i class="fa-solid ${icon} fa-lg"></i><span>${text}</span>`;
    return item;
};

sidebarItems.forEach(item => sidebar.appendChild(createSidebarItem(item)));

const projects = document.createElement("div");
projects.classList.add("projects");
projects.innerHTML = '<span>My Projects</span><i class="fa-regular fa-plus fa-sm"></i>';
sidebar.appendChild(projects);

Project.GetProjectList().forEach(project => {
    const projectItem = createSidebarItem({ class: 'project-item', icon: 'fa-folder', text: project.name });
    sidebar.appendChild(projectItem);
});

const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
    <div class="modal-content">
        <form id="add-task-form">
            <input type="text" id="task-title" name="task-title" placeholder="Task name" required>
            <input type="text" id="task-description" name="task-description" placeholder="Description" required>
            <div class="todo-time-and-priority">
                <input type="text" id="datetimePicker" class="task-due-date" name="task-due-date" placeholder="Select Date and Time" required>
                <div class="custom-select">
                    <div class="select-selected"><span class="flag medium"></span> Medium</div>
                    <div class="select-items">
                        <div class="select-item"><span class="flag high"></span> High</div>
                        <div class="select-item selected"><span class="flag medium"></span> Medium</div>
                        <div class="select-item"><span class="flag low"></span> Low</div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="project-selector-and-submit"></div>
        </form>
    </div>
`;

document.body.appendChild(modal);

let currentView = 'today';

const viewHandlers = {
    'inbox': loadInbox,
    'today': loadTodayTodos,
    'this-week': loadThisWeekTodos,
    'all-tasks': loadAllTodos
};

sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.sidebar-item');
    if (item && !item.classList.contains('add-task')) {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const view = Object.keys(viewHandlers).find(key => item.classList.contains(key));
        if (view) {
            currentView = view;
            viewHandlers[view]();
        }
    }
});

document.querySelector('.add-task').addEventListener('click', openModal);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
        ToDo.Delete(e.target.getAttribute('data-id'));
        refreshCurrentView();
    }
});

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function refreshCurrentView() {
    viewHandlers[currentView]();
    document.querySelector(`.${currentView}`).classList.add('active');
}

function loadTodos(container, todos) {
    const incompleteCount = todos.filter(todo => !todo.done).length;

    function updateTaskCount() {
        const incompleteCount = todos.filter(todo => !todo.done).length;
        const taskCountElement = container.querySelector('.today-task-count span');
        taskCountElement.textContent = `${incompleteCount} tasks`;
    }

    container.innerHTML = `
        <div class="today-header">${currentView.charAt(0).toUpperCase() + currentView.slice(1)}</div>
        <div class="today-task-count">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" class="siIBvPn"><path fill="currentColor" fill-rule="evenodd" d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z" clip-rule="evenodd"></path></svg>
            <span>${incompleteCount} tasks</span>
        </div>
    `;

    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerHTML = `
            <div class="todo-checkbox">
                <label class="custom-checkbox">
                    <input type="checkbox" ${todo.done ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="todo-content">
                <div class="todo-title"><span>${todo.title}</span></div>
                <div class="todo-description"><span>${todo.description}</span></div>
                <div class="todo-priority"><span class="flag ${todo.priority.toLowerCase()}"></span><span>${todo.priority}</span></div>
                <div class="todo-due-hour"><span>${todo.dueDate}</span><hr></div>
            </div>
            <div class="todo-actions">
                <i class="fa-solid fa-trash-can" data-id="${todo.uniqueKey}"></i>
            </div>
        `;

        if (todo.done) {
            todoItem.classList.add('completed');
        }

        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            todo.done = checkbox.checked;
            if (checkbox.checked) {
                todoItem.classList.add('completed');
                ToDo.Complete(todo.uniqueKey);
            } else {
                todoItem.classList.remove('completed');
                ToDo.Uncomplete(todo.uniqueKey);
            }
            updateTaskCount();
        });

        container.appendChild(todoItem);
    });

    updateTaskCount();
}

function loadInbox() {
    const inboxContainer = document.createElement("div");
    inboxContainer.classList.add("inbox-container");
    const inboxTodos = ToDo.GetToDoList().filter(todo => todo.projectID.trim() === 'none');
    loadTodos(inboxContainer, inboxTodos);
    viewContent.innerHTML = "";
    viewContent.appendChild(inboxContainer);
}

function loadTodayTodos() {
    const todayContainer = document.createElement("div");
    todayContainer.classList.add("today-container");
    const today = new Date();
    const todaysTodos = ToDo.GetToDoList().filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return dueDate.getDay() === today.getDay();
    });
    loadTodos(todayContainer, todaysTodos);
    viewContent.innerHTML = "";
    viewContent.appendChild(todayContainer);
}

function loadThisWeekTodos() {
    const thisWeekContainer = document.createElement("div");
    thisWeekContainer.classList.add("this-week-container");
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    const thisWeekTodos = ToDo.GetToDoList().filter(todo => {
        const dueDate = new Date(todo.dueDate);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
    });
    loadTodos(thisWeekContainer, thisWeekTodos);
    viewContent.innerHTML = "";
    viewContent.appendChild(thisWeekContainer);
}

function loadAllTodos() {
    const allTodosContainer = document.createElement("div");
    allTodosContainer.classList.add("all-todos-container");
    loadTodos(allTodosContainer, ToDo.GetToDoList());
    viewContent.innerHTML = "";
    viewContent.appendChild(allTodosContainer);
}

refreshCurrentView();

document.addEventListener('DOMContentLoaded', () => {
    flatpickr("#datetimePicker", {
        dateFormat: "Y-m-d",
        minDate: "today",
        defaultDate: new Date(),
        time_24hr: true,
    });

    const select = document.querySelector('.custom-select');
    const selected = select.querySelector('.select-selected');
    const items = select.querySelectorAll('.select-item');

    selected.addEventListener('click', () => {
        const itemsContainer = select.querySelector('.select-items');
        itemsContainer.style.display = itemsContainer.style.display === 'block' ? 'none' : 'block';
    });

    items.forEach(item => {
        item.addEventListener('click', function() {
            selected.innerHTML = this.innerHTML;
            items.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            select.querySelector('.select-items').style.display = 'none';
        });
    });

    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) {
            select.querySelector('.select-items').style.display = 'none';
        }
    });

    const projectSelectorContainer = document.querySelector('.project-selector-and-submit');
    const projectSelect = document.createElement("select");
    projectSelect.classList.add("project-select");
    projectSelect.innerHTML = '<option value="none">Select Project</option>' +
        Project.GetProjectList().map(project => `<option value="${project.name}">${project.name}</option>`).join('');
    projectSelectorContainer.appendChild(projectSelect);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-cancel-button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", closeModal);

    const submitButton = document.createElement("button");
    submitButton.classList.add("modal-submit-button");
    submitButton.textContent = "Add Task";

    projectSelectorContainer.appendChild(cancelButton);
    projectSelectorContainer.appendChild(submitButton);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector("#add-task-form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const formData = new FormData(form);
        new ToDo(
            formData.get("task-title"),
            formData.get("task-description"),
            formData.get("task-due-date"),
            document.querySelector('.select-selected').textContent.trim(),
            projectSelect.value
        );
        refreshCurrentView();
        closeModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});