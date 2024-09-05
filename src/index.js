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

function Initialize() {
    if (Project.GetProjectList().length === 0) {
        new Project('Work');
        new Project('Personal');
        new Project('School');
    }

    if (Task.GetTaskList().length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        const nextWeek = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const formatDate = (date) => date.toISOString().split('T')[0];

        new Task('Meeting with client', 'Discuss project requirements', formatDate(tomorrow), 'High', 'Work');
        new Task('Buy groceries', 'Buy milk, bread, and cheese', formatDate(today), 'Medium', 'Work');
        new Task('Write code', 'Write code for the project', formatDate(nextWeek), 'Medium', 'Work');
        new Task('Pickup dry cleaning', 'Pickup dry cleaning at 7am', formatDate(nextWeek), 'Low', 'Personal');
        new Task('Call mom', 'Call mom and tell her that I love her', formatDate(tomorrow), 'High', 'Personal');
        new Task('Cook dinner', 'Cook dinner for tomorrow', formatDate(tomorrow), 'Medium', 'Personal');
        new Task('Study for exam', 'Study for the math exam', formatDate(nextWeek), 'Medium', 'School');
        new Task('Submit assignment', 'Submit assignment to class', formatDate(tomorrow), 'Low', 'School');
    }
}

Initialize();

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

const createProjectItem = ({ itemClass, projectIcon, text, id, deleteIcon }) => {
    const item = document.createElement("div");
    item.classList.add(itemClass, "project-item", "sidebar-item");
    item.innerHTML = `<i class="fa-solid ${projectIcon} fa-lg"></i><span>${text}</span><i class="fa-solid ${deleteIcon} fa-lg delete-project-icon" data-id="${id}"></i>`;
    return item;
}

sidebarItems.forEach(item => sidebar.appendChild(createSidebarItem(item)));

const projects = document.createElement("div");
projects.classList.add("projects");
projects.innerHTML = '<span>My Projects</span><div class="add-project"><i class="fa-regular fa-plus fa-sm"></i></div>';
sidebar.appendChild(projects);

const projectList = document.createElement("div");
projectList.classList.add("project-list");
sidebar.appendChild(projectList);

RenderProjects();
function RenderProjects() {
    projectList.innerHTML = '';

    Project.GetProjectList().forEach(project => {
        const projectItem = createProjectItem({ class: 'project-item', projectIcon: 'fa-bars-progress', text: project.name, id: project.uniqueKey, deleteIcon: 'fa-trash' }); 
        projectList.appendChild(projectItem);
    });
}
const addTaskModal = document.createElement("div");
addTaskModal.classList.add("add-task-modal");
addTaskModal.innerHTML = `
    <div class="modal-content">
        <form id="add-task-form">
            <input type="text" id="add-task-title" name="task-title" placeholder="Task name" required>
            <input type="text" id="add-task-description" name="task-description" placeholder="Description" required>
            <div class="task-time-and-priority">
                <input type="text" id="datetime-picker" class="time-picker" name="task-due-date" placeholder="Select Date" required>
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
            <div class="project-selector-and-submit">
                <select class="project-select">
                    <option value="none">Select Project</option>
                    ${Project.GetProjectList().map(project => `<option value="${project.name}">${project.name}</option>`).join('')}
                </select>
                <button class="modal-cancel-button cancel-add-button"">Cancel</button>
                <button class="modal-submit-button add-button">Add Task</button>
            </div>
        </form>
    </div>
`;

function closeAddTaskModal(event) {
    event.preventDefault();
    addTaskModal.style.display = 'none';
}

const updateTaskModal = document.createElement("div");
updateTaskModal.classList.add("update-task-modal");
updateTaskModal.innerHTML = `
    <div class="modal-content">
        <form id="update-task-form">
            <input type="text" id="update-task-title" name="task-title" placeholder="Task name" required>
            <input type="text" id="update-task-description" name="task-description" placeholder="Description" required>
            <div class="task-time-and-priority">
                <input type="text" id="update-datetime-picker" class="time-picker" name="task-due-date" placeholder="Select Date" required>
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
           <div class="project-selector-and-submit">
                <select class="project-select">
                    <option value="none">Select Project</option>
                    ${Project.GetProjectList().map(project => `<option value="${project.name}">${project.name}</option>`).join('')}
                </select>
                <button class="modal-cancel-button cancel-update-button"">Cancel</button>
                <button class="modal-submit-button update-button">Update Task</button>
            </div>
        </form>
    </div>
`;

function closeUpdateTaskModal(event) {
    event.preventDefault();
    updateTaskModal.style.display = 'none';
}

const addProjectModal = document.createElement("div");
addProjectModal.classList.add("add-project-modal");
addProjectModal.innerHTML = `
    <div class="modal-content">
        <form id="add-project-form">
            <input type="text" id="add-project-name" name="project-name" placeholder="Project name" maxlength="10" required>
            <button class="modal-cancel-button cancel-add-project-button">Cancel</button>
            <button class="modal-submit-button add-project-button">Add Project</button>
        </form>
    </div>
`;

function closeAddProjectModal(event) {
    event.preventDefault();
    addProjectModal.style.display = 'none';
}

document.body.appendChild(addTaskModal);
document.body.appendChild(updateTaskModal);
document.body.appendChild(addProjectModal);

const cancelAddTaskButton = document.querySelector('.cancel-add-button');
cancelAddTaskButton.addEventListener('click', closeAddTaskModal);

const cancelUpdateTaskButton = document.querySelector('.cancel-update-button');
cancelUpdateTaskButton.addEventListener('click', closeUpdateTaskModal);

const cancelAddProjectButton = document.querySelector('.cancel-add-project-button');
cancelAddProjectButton.addEventListener('click', closeAddProjectModal);

let currentView = 'today';

const viewHandlers = {
    'inbox': loadInbox,
    'today': loadTodayTasks,
    'this-week': loadThisWeekTasks,
    'all-tasks': loadAllTasks,
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
        } else {
            currentView = item.querySelector('span').textContent;            
            loadProjectTasks(item.textContent.trim());
        }
    }
});

document.querySelector('.add-task').addEventListener('click', () => {
    addTaskModal.style.display = "block";
    document.querySelector("#add-task-form").reset();
    const titleField = document.querySelector("#add-task-title");
    titleField.focus();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
        Task.Delete(e.target.getAttribute('data-id'));
        refreshCurrentView();
    }
});

function refreshCurrentView() {
    if (!viewHandlers[currentView]) {
        loadProjectTasks(currentView);
        return;
    }
    viewHandlers[currentView]();
    document.querySelector(`.${currentView}`).classList.add('active');
}

function loadTasks(tasks) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const incompleteCount = tasks.filter(task => !task.done).length;

    function updateTaskCount() {
        const incompleteCount = tasks.filter(task => !task.done).length;
        const taskCountElement = taskContainer.querySelector('.task-count span');
        taskCountElement.textContent = `${incompleteCount} tasks`;
    }

    taskContainer.innerHTML = `
        <div class="task-header">${currentView.charAt(0).toUpperCase() + currentView.slice(1)}</div>
        <div class="task-count">
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

        const taskContent = taskItem.querySelector('.task-content');
        taskContent.addEventListener('click', function() {
            const updateTaskModal = document.querySelector('.update-task-modal');
            updateTaskModal.style.display = 'block';

            const titleField = updateTaskModal.querySelector('input[name="task-title"]');
            titleField.focus();

            const updateTaskForm = document.querySelector('#update-task-form');
            updateTaskForm.reset();
            updateTaskForm.querySelector('input[name="task-title"]').value = task.title;
            updateTaskForm.querySelector('input[name="task-description"]').value = task.description;
            updateTaskForm.querySelector('input[name="task-due-date"]').value = task.dueDate;
            updateTaskForm.querySelector('.select-selected').innerHTML = `<span class="flag ${task.priority.toLowerCase()}"></span> ${task.priority}`;
            const projectSelect = updateTaskForm.querySelector('.project-select');
            projectSelect.value = task.projectID;

            const updateTaskButton = document.querySelector('.update-button');
            updateTaskButton.addEventListener('click', (event) => {
                event.preventDefault();
                const formData = new FormData(updateTaskForm);
                const title = formData.get("task-title");
                const description = formData.get("task-description");
                const dueDate = formData.get("task-due-date");
                const priority = updateTaskForm.querySelector('.select-selected').textContent.trim();
                const project = projectSelect.value;

                Task.Update(task.uniqueKey, title, description, dueDate, priority, project);
                refreshCurrentView();
                updateTaskModal.style.display = 'none';
            });
        })
        taskContainer.appendChild(taskItem);
    });

    viewContent.innerHTML = '';
    viewContent.appendChild(taskContainer);
    updateTaskCount();
}

function loadInbox() {
    loadTasks(Task.GetTaskList().filter(task => task.projectID.trim() === 'none'));
}

function loadTodayTasks() {
    loadTasks(Task.GetTaskList().filter(task => new Date(task.dueDate).getDay() === new Date().getDay()));
}

function loadThisWeekTasks() {
    loadTasks(Task.GetTaskList().filter(task => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        const dueDate = new Date(task.dueDate);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
    }));
}

function loadAllTasks() {
    loadTasks(Task.GetTaskList());
}

function loadProjectTasks(projectName) {
    loadTasks(Task.GetTaskList().filter(task => task.projectID.trim() === projectName));
}

refreshCurrentView();

document.addEventListener('DOMContentLoaded', () => {
    flatpickr(".time-picker", {
        dateFormat: "Y-m-d",
        minDate: "today",
        defaultDate: new Date(),
        time_24hr: true,
    });

    const selects = document.querySelectorAll('.custom-select');

    selects.forEach(select => {
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
    });

    const submitButton = document.querySelector('.add-button');
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.querySelector("#add-task-form");
        if (!form.checkValidity()) { form.reportValidity(); return; }

        const formData = new FormData(form);
        const projectSelect = document.querySelector('.project-select');
        new Task(
            formData.get("task-title"),
            formData.get("task-description"),
            formData.get("task-due-date"),
            document.querySelector('.select-selected').textContent.trim(),
            projectSelect.value
        );
        refreshCurrentView();
        addTaskModal.style.display = "none";
    });

    addTaskModal.addEventListener('click', (event) => {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = "none";
        }
    });

    updateTaskModal.addEventListener('click', (event) => {
        if (event.target === updateTaskModal) {
            updateTaskModal.style.display = "none";
        }
    });

    addProjectModal.addEventListener('click', (event) => {
        if (event.target === addProjectModal) {
            addProjectModal.style.display = "none";
        }
    });

    const addProjectButton = document.querySelector('.add-project');
    const submitProjectButton = document.querySelector('.add-project-button');
    const form = document.querySelector("#add-project-form");
    
    addProjectButton.addEventListener("click", () => {
        addProjectModal.style.display = 'block';
        const projectName = document.querySelector("#add-project-name");
        projectName.focus();
        form.reset();
    });
    
    submitProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    
        const formData = new FormData(form);
        let projectName = formData.get("project-name");
        projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1);
        new Project(projectName);
        RenderProjects();
        addProjectModal.style.display = "none";
    });


    document.querySelector('.sidebar').addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-project-icon')) {
            const projectKey = event.target.getAttribute('data-id');
            Project.Delete(projectKey);
            Task.DeleteProjectTasks(projectKey);
            RenderProjects();
            viewHandlers['today']();
            const todaySidebarItem = document.querySelector('.sidebar-item.today');
            todaySidebarItem.classList.add('active');
        }
    });
});