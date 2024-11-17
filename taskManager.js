const { loadTasks, saveTasks } = require('./taskFileUtils');

function addTask(description) {
    if (!description) {
        console.log('Task description cannot be empty.');
        return;
    }

    const tasks = loadTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, description) {
    if (!description) {
        console.log('Updated description cannot be empty.');
        return;
    }

    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ID ${id} updated successfully.`);
}

function deleteTask(id) {
    const tasks = loadTasks();
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task ID ${id} deleted successfully.`);
}

function markTask(id, status) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);

    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ID ${id} marked as ${status}.`);
}

function listTasks(status) {
    const tasks = loadTasks();

    let filteredTasks;
    switch (status) {
        case 'done':
            filteredTasks = tasks.filter(task => task.status === 'done');
            break;
        case 'todo':
            filteredTasks = tasks.filter(task => task.status === 'todo');
            break;
        case 'in-progress':
            filteredTasks = tasks.filter(task => task.status === 'in-progress');
            break;
        default:
            filteredTasks = tasks;
    }

    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
        return;
    }

    console.table(filteredTasks.map(({ id, description, status, createdAt, updatedAt }) => ({
        ID: id,
        Description: description,
        Status: status,
        CreatedAt: new Date(createdAt).toLocaleString(),
        UpdatedAt: new Date(updatedAt).toLocaleString(),
    })));
}

module.exports = { addTask, updateTask, deleteTask, markTask, listTasks };
