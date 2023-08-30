//To show date day and time in web application

var dt = new Date();
Day = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
Time = String(dt.getHours()).padStart(2,"0") + " : " + String(dt.getMinutes()).padStart(2,"0");
var today = dt.getFullYear() + " / " + (dt.getMonth() + 1) + " / " + dt.getDate() + " | " + Day[dt.getDay()] + " | " + Time;
document.getElementById('date-time').innerHTML = today;

// This is to add new Tasks
let addTask = document.getElementById("addBtn")
addTask.addEventListener('click', () => {
    let allTasks;
    let tasks = localStorage.getItem("tasks")
    if (tasks == null) {
        allTasks = []
    }
    else {
        allTasks = JSON.parse(tasks);
    }
    let title = document.getElementById("title")
    let descp = document.getElementById("descp");

    console.log(title.value);
    console.log(descp.value);

    let newNoteObj = {
        title: title.value,
        descp: descp.value
    }

    if (addTask.innerText === "Update Task") {
        let editCard = document.querySelector('.task-card')
        let editIndex = editCard.getAttribute('editIndex')
        allTasks[editIndex] = newNoteObj

        addTask.innerText = "Add Task"
    }
    else {
        allTasks.push(newNoteObj);
    }
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    title.value = ''
    descp.value = ''

    showMyTasks();
})

//To display all the tasks

function showMyTasks() {
    let allTasks;
    let tasks = localStorage.getItem("tasks");
    if (tasks == null) {
        allTasks = []
    }
    else {
        allTasks = JSON.parse(tasks);
    }
    let tasksContainer = document.getElementById("container");
    tasksContainer.innerHTML = '';
    allTasks.forEach((task, index) => {
        tasksToBeShown = `<div class="task-card">
                            <h3>${task.title}</h3>
                            <p>${task.descp}</p>
                            <div>
                                <button id="delete" onclick="deleteTask(${index})" >Delete</button>
                                <button id="edit" onclick="editTask(${index})" >Edit</button>
                                <label for="Task-Status">Status: </label>
                                <select name="Task-Status" id="task-Status">
                                    <option value="task">Task</option>
                                    <option value="doing">Doing</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>`
        tasksContainer.innerHTML = tasksContainer.innerHTML + tasksToBeShown
    });
}

showMyTasks();

//TO delete task

function deleteTask(taskIndex) {
    let allTasks = JSON.parse(localStorage.getItem('tasks'));
    allTasks.splice(taskIndex, 1)
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showMyTasks();
}

//To edit Task
function editTask(taskIndex) {
    let allTasks = JSON.parse(localStorage.getItem('tasks'));
    addTask.innerText = "Update Task"

    let title = document.getElementById("title")
    let descp = document.getElementById("descp");

    title.value = allTasks[taskIndex].title
    descp.value = allTasks[taskIndex].descp

    let editCard = document.querySelector('.task-card')
    editCard.setAttribute('editIndex', `${taskIndex}`)

}

//TO search Tasks

let search = document.getElementById('search')
search.addEventListener('input', () => {
    let inputValue = search.value.toLowerCase()
    let allCards = document.getElementsByClassName('task-card');
    Array.from(allCards).forEach((card) => {
        let cardText = card.getElementsByTagName('p')[0].innerText
        if (cardText.toLowerCase().includes(inputValue)) {
            card.style.display = 'block';
        }
        else {
            card.style.display = 'none';
        }
    })
})


