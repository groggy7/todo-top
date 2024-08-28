import ToDo from "./todo/todo.js";
import Project from "./project/project.js";
import "./style.css";
import '@fortawesome/fontawesome-free/css/all.css';

const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

const sidebarInfo = document.createElement("div");
sidebarInfo.classList.add("sidebar-info");
sidebarInfo.innerHTML = `
    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 45.532 45.532"xml:space="preserve"><g><path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"/></g></svg>    
    <span>John Doe</span>
    <svg class="sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887Zm10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5c-1.571 0-2.8.656-3.618 1.883-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723-.074.081-.15.166-.232.261-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557-.082-.095-.158-.18-.232-.261-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884ZM14 17.5h-4a2 2 0 1 0 4 0Z" clip-rule="evenodd"></path></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z" clip-rule="evenodd"></path></svg>
`;

sidebar.appendChild(sidebarInfo);

const today = document.createElement("div");
today.classList.add("today");
today.innerHTML = `
    <i class="fa-solid fa-calendar-week fa-lg"></i>
    <span>Today</span>
`;

const thisWeek = document.createElement("div");
thisWeek.classList.add("this-week");
thisWeek.innerHTML = `
   <i class="fa-solid fa-calendar-days fa-lg"></i>
    <span>This Week</span>
`;

const allTasks = document.createElement("div");
allTasks.classList.add("all-tasks");
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

sidebar.appendChild(today);
sidebar.appendChild(thisWeek);
sidebar.appendChild(allTasks);
sidebar.appendChild(projects);

let projectList = Project.GetProjectList();
console.log(projectList);
projectList.forEach(project => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
        <i class="fa-solid fa-folder fa-lg"></i>
        <span>${project.name}</span>
`;
    sidebar.appendChild(projectItem);
});

body.appendChild(sidebar);