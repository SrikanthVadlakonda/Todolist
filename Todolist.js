const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector("#pending-tasks .count-value");
let taskCount = 0;

const displayCount = () => {
    countValue.innerText = taskCount;
};

const updateTaskCount = () => {
    taskCount = document.querySelectorAll(".task").length;
    displayCount();
};

const deleteTask = (taskElement) => {
    taskElement.remove();
    updateTaskCount();
};

const editTask = (taskElement) => {
    const taskName = taskElement.querySelector(".taskname").innerText;
    newTaskInput.value = taskName.trim();
    taskElement.remove(); // Remove the task from the list
    updateTaskCount();
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <button class="edit">
                <i class="fas fa-pen"></i>
            </button>
            <button class="delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
    newTaskInput.value = "";
    updateTaskCount();
};

addBtn.addEventListener("click", addTask);

taskContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete")) {
        deleteTask(target.closest(".task"));
    } else if (target.classList.contains("edit")) {
        editTask(target.closest(".task"));
    }
});

window.onload = () => {
    taskCount = document.querySelectorAll(".task").length;
    displayCount();
};
