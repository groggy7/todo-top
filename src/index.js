import Task from "./task/task.js";
import Project from "./project/project.js";
import "./style.css";
import '@fortawesome/fontawesome-free/css/all.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import profileIcon from "./assets/profile.svg";
import bellIcon from "./assets/bell.svg";
import collapseIcon from "./assets/collapse.svg";
import checkedIcon from "./assets/checked.svg";

const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
const viewContent = document.createElement("div");
viewContent.classList.add("view-content");
main.appendChild(viewContent);

const sidebarInfo = document.createElement("div");
sidebarInfo.classList.add("sidebar-info");
sidebarInfo.innerHTML = `
    <img src="${profileIcon}" alt="Profile Picture">
    <span>John Doe</span>
    <img src="${bellIcon}" class="sidebar-icon" alt="Notifications">
    <img src="${collapseIcon}" alt="Collapse Sidebar">
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
modal.classList.add("add-task-modal");
modal.innerHTML = `
    <div class="modal-content">
        <form id="add-task-form">
            <input type="text" id="task-title" name="task-title" placeholder="Task name" required>
            <input type="text" id="task-description" name="task-description" placeholder="Description" required>
            <div class="task-time-and-priority">
                <input type="text" id="datetimePicker" class="task-due-date" name="task-due-date" placeholder="Select Date" required>
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
    'today': loadTodayTasks,
    'this-week': loadThisWeekTasks,
    'all-tasks': loadAllTasks
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

document.querySelector('.add-task').addEventListener('click', openAddTaskModal);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
        Task.Delete(e.target.getAttribute('data-id'));
        refreshCurrentView();
    }
});

function openAddTaskModal() {
    modal.style.display = "block";
    document.querySelector("#add-task-form").reset();
}

function closeAddTaskModal() {
    modal.style.display = "none";
}

function refreshCurrentView() {
    viewHandlers[currentView]();
    document.querySelector(`.${currentView}`).classList.add('active');
}

function loadTasks(container, tasks) {
    const incompleteCount = tasks.filter(task => !task.done).length;

    function updateTaskCount() {
        const incompleteCount = tasks.filter(task => !task.done).length;
        const taskCountElement = container.querySelector('.today-task-count span');
        taskCountElement.textContent = `${incompleteCount} tasks`;
    }

    container.innerHTML = `
        <div class="today-header">${currentView.charAt(0).toUpperCase() + currentView.slice(1)}</div>
        <div class="today-task-count">
            <img src="${checkedIcon}" alt="Checked Icon">           
            <span>${incompleteCount} tasks</span>
        </div>
    `;

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <div class="task-checkbox">
                <label class="custom-checkbox">
                    <input type="checkbox" ${task.done ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
            </div>
            <div class="task-content">
                <div class="task-title"><span>${task.title}</span></div>
                <div class="task-description"><span>${task.description}</span></div>
                <div class="task-priority"><span class="flag ${task.priority.toLowerCase()}"></span><span>${task.priority}</span></div>
                <div class="task-due-hour"><span>${task.dueDate}</span><hr></div>
            </div>
            <div class="task-actions">
                <i class="fa-solid fa-trash-can" data-id="${task.uniqueKey}"></i>
            </div>
        `;

        if (task.done) {
            taskItem.classList.add('completed');
        }

        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            task.done = checkbox.checked;
            if (checkbox.checked) {
                taskItem.classList.add('completed');
                Task.Complete(task.uniqueKey);
            } else {
                taskItem.classList.remove('completed');
                Task.Uncomplete(task.uniqueKey);
            }
            updateTaskCount();
        });

        container.appendChild(taskItem);
    });

    updateTaskCount();
}

function loadInbox() {
    const inboxContainer = document.createElement("div");
    inboxContainer.classList.add("inbox-container");
    const inboxTasks = Task.GetTaskList().filter(task => task.projectID.trim() === 'none');
    loadTasks(inboxContainer, inboxTasks);
    viewContent.innerHTML = "";
    viewContent.appendChild(inboxContainer);
}

function loadTodayTasks() {
    const todayContainer = document.createElement("div");
    todayContainer.classList.add("today-container");
    const today = new Date();
    const todaysTasks = Task.GetTaskList().filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate.getDay() === today.getDay();
    });
    loadTasks(todayContainer, todaysTasks);
    viewContent.innerHTML = "";
    viewContent.appendChild(todayContainer);
}

function loadThisWeekTasks() {
    const thisWeekContainer = document.createElement("div");
    thisWeekContainer.classList.add("this-week-container");
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    const thisWeekTasks = Task.GetTaskList().filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
    });
    loadTasks(thisWeekContainer, thisWeekTasks);
    viewContent.innerHTML = "";
    viewContent.appendChild(thisWeekContainer);
}

function loadAllTasks() {
    const allTasksContainer = document.createElement("div");
    allTasksContainer.classList.add("all-tasks-container");
    loadTasks(allTasksContainer, Task.GetTaskList());
    viewContent.innerHTML = "";
    viewContent.appendChild(allTasksContainer);
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
    cancelButton.addEventListener("click", closeAddTaskModal);

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
        new Task(
            formData.get("task-title"),
            formData.get("task-description"),
            formData.get("task-due-date"),
            document.querySelector('.select-selected').textContent.trim(),
            projectSelect.value
        );
        refreshCurrentView();
        closeAddTaskModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeAddTaskModal();
        }
    });
});