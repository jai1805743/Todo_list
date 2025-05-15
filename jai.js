
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector('#newtask input');
    const taskContainer = document.querySelector('#task');
    const pushButton = document.querySelector('#push');

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskContainer.innerHTML = "";
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task").forEach(taskElem => {
            const text = taskElem.querySelector("#taskname").innerText.trim();
            const completed = taskElem.classList.contains("completed");
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add task to DOM
    function addTaskToDOM(taskText, completed = false) {
        const taskHTML = document.createElement("div");
        taskHTML.className = "task justify-between";
        if (completed) taskHTML.classList.add("completed");

        taskHTML.innerHTML = `
            <span id="taskname">${taskText}</span>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        `;

        // Delete task
        taskHTML.querySelector(".delete").onclick = function () {
            taskHTML.remove();
            saveTasks();
        };

        // Toggle completed
        taskHTML.onclick = function (e) {
            if (!e.target.classList.contains('delete') && !e.target.closest('.delete')) {
                taskHTML.classList.toggle("completed");
                saveTasks();
            }
        };

        taskContainer.appendChild(taskHTML);
    }

    // Handle add task
    pushButton.onclick = function () {
        const taskText = taskInput.value.trim();
        if (taskText.length === 0) {
            alert("Please Enter a task");
        } else {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = ""; // Clear input
        }
    };

    loadTasks(); // Initial load
});
