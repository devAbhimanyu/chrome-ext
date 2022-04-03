const taskSection = document.getElementById("task-list");
let tasks = [];

const addTaskBtn = document.getElementById("add-task");
addTaskBtn.addEventListener("click", () => addTask());

const startTimerBtn = document.getElementById("start.timer");

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTasks() {
  taskSection.textContent = "";
  tasks.forEach((_, idx) => {
    renderTask(idx);
  });
}

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ?? [];
  renderTasks();
});

function deleteTask(taskIdx) {
  tasks.splice(taskIdx, 1);
  saveTasks();
  renderTasks();
}

function renderTask(taskNum, value = "") {
  const taskRow = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter Task Details";
  textInput.value = tasks[taskNum];
  textInput.addEventListener("keyup", (e) => {
    tasks[taskNum] = e.target.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(textInput);
  taskRow.appendChild(deleteBtn);

  taskSection.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}
