import ToDo from "./todo/todo.js";
import Project from "./project/project.js";

const name = "mynewproject";

const title = "My New Project";
const description = "This is a new project";
const dueDate = "2021-12-31";
const priority = "high";

const todo =  new ToDo(name, title, description, dueDate, priority);
const todo1 =  new ToDo(name, title, description, dueDate, priority);
console.log(ToDo.GetToDoList())

const project = new Project("project1");

project.AddTodo(todo);
project.AddTodo(todo1);

console.log(project.GetTodoList());
console.log(Project.GetProjectList());