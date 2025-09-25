const addTaskBtn = document.getElementById('addTask');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('taskList');

// Helper: load all tasks from backend
async function loadTasks() {
    taskList.innerHTML = "";
    const response = await fetch("http://127.0.0.1:5000/tasks");
    const tasks = await response.json();
    tasks.forEach((task, index) => addTaskToDOM(task.text, index));
}

// Helper: add task to DOM
function addTaskToDOM(text, index) {
    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add task to backend
async function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text: taskText })
    });

    taskInput.value = "";
    loadTasks(); // Refresh the list
}

// Delete task from backend
async function deleteTask(index) {
    await fetch(`http://127.0.0.1:5000/tasks/${index}`, {
        method: "DELETE"
    });
    loadTasks(); // Refresh the list
}

// Event listener
addTaskBtn.addEventListener('click', addTask);

// Load tasks on page load
loadTasks();
