//projects bar
const openProjectFormBtn = document.querySelector(".open-project-form")
let projectForm = document.querySelector(".project-form")
const addProjectBtn = document.querySelector(".add-project")
const cancelProjectBtn = document.querySelector(".cancel-project")
let projectName = document.getElementById("project-name")
let projectDescription = document.getElementById("project-description")
let ul = document.querySelector(".projects-list")

//tasks bar
let taskContent = document.querySelector(".task-content") //div
let h3ProjectName = document.querySelector(".project-name") //h3
let pProjectDescription = document.querySelector(".project-description") //p
const openTaskFormBtn = document.querySelector(".open-task-form")
let ulTasksList = document.querySelector(".tasks-list") // ul
let divTasksForm = document.querySelector(".task-form") // div
const addTaskBtn = document.querySelector(".add-task") //button
const cancelTaskBtn = document.querySelector(".cancel-task")
let inputTaskName = document.getElementById("task-name") //input
let taskPriority = document.getElementById("task-priority")//select
let taskDate = document.getElementById("task-date")//input

let allProjects = []

let currentProject = ''
let currentTask = ''
let taskCompleted = ''

if(!localStorage.getItem("allProjects")){
    console.log("no data");
}else{
    allProjects = JSON.parse(localStorage.getItem('allProjects'));
    allProjects.forEach(project => renderProject(project));
}

//projects buttons
function Project(name, description) {
    this.id = "",
    this.name = name,
    this.description = description,
    this.tasks = []
}

openProjectFormBtn.addEventListener("click", () => {
    openProjectFormBtn.style.display = "none"
    projectForm.style.display = "block"
})

cancelProjectBtn.addEventListener("click", closeForm)

addProjectBtn.addEventListener("click", () => {
    addProject()
    closeForm()
})

function closeForm() {
    openProjectFormBtn.style.display = "block"
    projectForm.style.display = "none"
    projectName.value = ""
    projectDescription.value = ""
}

//tasks buttons
function Task(name, priority, date) {
    this.id = "",
    this.name = name,
    this.priority = priority,
    this.date = date,
    this.completedStatus = false
}

openTaskFormBtn.addEventListener("click", () => {
    openTaskFormBtn.style.display = "none"
    divTasksForm.style.display = "block"
})

addTaskBtn.addEventListener("click", () => {
    addTask()
    closeTaskForm()
})

cancelTaskBtn.addEventListener("click", closeTaskForm)

function closeTaskForm() {
    openTaskFormBtn.style.display = "block"
    divTasksForm.style.display = "none"
    inputTaskName.value = ""
    taskPriority.value = ""
    taskDate.value = ""
}

function addProject() {
    let project = new Project(projectName.value, projectDescription.value)
    allProjects.push(project)
    console.log(allProjects)
    renderProject(project)
    localStorage.setItem('allProjects', JSON.stringify(allProjects))
    
}

function renderProject(element) {
    let li = document.createElement("li")
    li.classList.add("project")
    let span = document.createElement("span")
    span.classList.add("name")
    span.textContent = element.name
    span.addEventListener("click", displayProject)
    li.appendChild(span)

    let span2 = document.createElement("span")
    span2.textContent = "x"
    span2.addEventListener("click", deleteProject)
    li.appendChild(span2)

    ul.appendChild(li)

    element.id = allProjects.indexOf(element);
    let index = element.id

    function displayProject() {
        h3ProjectName.textContent = `Project: ${element.name}`
        h3ProjectName.style.display = "block"
        pProjectDescription.textContent = `Description: ${element.description}`
        pProjectDescription.style.display = "block"
        openTaskFormBtn.style.display = "block"
        ulTasksList.textContent = ""

        currentProject = allProjects[index]
    
        currentProject.tasks.forEach(task => renderTask(task))
    }

    function deleteProject(e) {
        allProjects.splice(index, 1)
        ul.removeChild(e.target.parentElement)
        h3ProjectName.textContent = "Project: "
        h3ProjectName.style.display = "none"
        pProjectDescription.textContent = "Description: "
        pProjectDescription.style.display = "none"
        openTaskFormBtn.style.display = "none"
        if(divTasksForm.style.display === "block") {
            divTasksForm.style.display = "none"
        }
        ulTasksList.textContent = ""

        localStorage.setItem('allProjects', JSON.stringify(allProjects))
    }
}


function renderTask(element) {
    let task = document.createElement("li")
    task.className = "task"

    let completeTaskbtn = document.createElement("button")
    completeTaskbtn.classList.add("complete")
    completeTaskbtn.textContent = "✓" //here
    element.completedStatus === false ? completeTaskbtn.style.background = "#fff" : completeTaskbtn.style.background = "#33d330";
    completeTaskbtn.addEventListener("click", changeStatus)
    task.appendChild(completeTaskbtn) 

    let spanTaskName = document.createElement("span")
    spanTaskName.classList.add("task-name-span")
    spanTaskName.textContent = `Name: ${element.name}`
    task.appendChild(spanTaskName)

    let spanTaskPriority = document.createElement("span")
    spanTaskPriority.classList.add("task-priority-span")
    spanTaskPriority.textContent = `Priority: ${element.priority}`
    task.appendChild(spanTaskPriority)

    let spanTaskDate = document.createElement("span")
    spanTaskDate.textContent = `Deadline: ${element.date}`
    task.appendChild(spanTaskDate)

    let spanEditTask = document.createElement("span")
    spanEditTask.classList.add("edit-task")
    spanEditTask.textContent = "Edit"
    spanEditTask.addEventListener("click", editTask)
    task.appendChild(spanEditTask)

    let spanDeleteTask = document.createElement("span")
    spanDeleteTask.classList.add("delete-task")
    spanDeleteTask.textContent = "x"
    spanDeleteTask.addEventListener("click", deleteTask)
    task.appendChild(spanDeleteTask)

    ulTasksList.appendChild(task)

    element.id = currentProject.tasks.indexOf(element)
    let index = element.id

    function deleteTask(e) {
        ulTasksList.removeChild(e.target.parentElement)
        currentProject.tasks.splice(index, 1)

        localStorage.setItem('allProjects', JSON.stringify(allProjects))
    }

    function changeStatus() {
        element.completedStatus = !element.completedStatus
        element.completedStatus === false ? 
        completeTaskbtn.style.background = "#fff" : 
        completeTaskbtn.style.background = "#33d330"
        taskCompleted = element.completedStatus

        localStorage.setItem('allProjects', JSON.stringify(allProjects))
    }

    function editTask() {
        addTaskBtn.textContent = "Update"
        divTasksForm.style.display = "block"
        inputTaskName.value = element.name
        taskPriority.value = element.priority
        taskDate.value = element.date
        currentTask = element.id
        taskCompleted = element.completedStatus
        localStorage.setItem('allProjects', JSON.stringify(allProjects))
    }

} 

function addTask() {
    if(inputTaskName.value !== "" && taskDate.value !== "") {
        let task = new Task(inputTaskName.value, taskPriority.value, taskDate.value)
        let existingTasks = currentProject.tasks

        if(addTaskBtn.textContent === "Add") {
            existingTasks.push(task)
            renderTask(task)
        } else if(addTaskBtn.textContent == "Update") {
            task.completedStatus = taskCompleted
            existingTasks.splice(currentTask, 1, task)
            ulTasksList.textContent = ""
            currentProject.tasks.forEach(task => renderTask(task))
            addTaskBtn.textContent = "Add"
        }
        localStorage.setItem('allProjects', JSON.stringify(allProjects))
    }
    
}