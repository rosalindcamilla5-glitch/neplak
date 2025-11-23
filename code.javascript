document.addEventListener('DOMContentLoaded', () => {
    loadTasks();

    document.querySelectorAll('.add-task').forEach(button => {
        button.addEventListener('click', addTask);
    });
});

function addTask(event) {
    const day = event.target.getAttribute('data-day');
    const input = document.querySelector(`#${day} .task-input`);
    const taskText = input.value.trim();

    if (taskText) {
        const taskList = document.querySelector(`#${day} .tasks`);
        const li = document.createElement('li');
        li.innerHTML = `${taskText} <button class="delete">Delete</button>`;
        taskList.appendChild(li);
        input.value = '';

        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        saveTasks();
    }
}

function saveTasks() {
    const tasks = {};
    document.querySelectorAll('.day').forEach(day => {
        const dayId = day.id;
        const taskItems = Array.from(day.querySelectorAll('.tasks li')).map(li => li.textContent.replace('Delete', '').trim());
        tasks[dayId] = taskItems;
    });
    localStorage.setItem('weeklyTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('weeklyTasks')) || {};
    Object.keys(tasks).forEach(day => {
        const taskList = document.querySelector(`#${day} .tasks`);
        tasks[day].forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task} <button class="delete">Delete</button>`;
            taskList.appendChild(li);

            li.querySelector('.delete').addEventListener('click', () => {
                li.remove();
                saveTasks();
            });
        });
    });
}
