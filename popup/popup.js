const taskSection = document.getElementById("task-list");
let tasks = [];

/**
 * timer text
 */

function updateTime() {
  chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
    const time = document.getElementById("time");
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
      2,
      "0"
    );
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
    startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer";
  });
}

updateTime();
setInterval(updateTime, 1000);

/**
 * start timer button section
 */
const startTimerBtn = document.getElementById("start-timer");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

/**
 * reset timer button
 */
const resetTimerBtn = document.getElementById("reset-timer");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

/**
 * add new task
 */
const addTaskBtn = document.getElementById("add-task");
addTaskBtn.addEventListener("click", () => addTask());

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
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

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}
