let tasksData = {};

const todo = document.querySelector('#Todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#Done');
const columns = [todo, progress, done];
let dragElement = null;

function addTask(title,desc,column ){
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
        
    `;
    column.appendChild(div);

    div.addEventListener("drag", (e) => {
        dragElement = div;

    });

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () =>
    {
        div.remove();
        updateTaskCount();
    });

    return div;

}

function updateTaskCount(){
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        
        tasksData[col.id] = Array.from(tasks).map(t=>{ 

            return{
                title:t.querySelector("h2").innerText,
                desc:t.querySelector("p").innerText
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasksData));
        count.innerText = tasks.length;
        });
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    /*console.log(data);*/

    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(tasks => {
            addTask(tasks.title, tasks.desc, column);
        });
        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right");
        count.innerText = tasks.length;

    }
    updateTaskCount();
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    });
});

function addDragEventsOnColumn(column){
    column.addEventListener("dragenter", (e) =>{
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");

    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();

    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateTaskCount();                  

    });
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

/* Modal Related Logic*/
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () =>{
    const taskTitle  = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    if (!taskTitle.trim()) return;

    addTask(taskTitle, taskDesc, todo);

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
        
    updateTaskCount();
    modal.classList.remove("active");
});
