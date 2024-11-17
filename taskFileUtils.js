const fs = require('fs');
const path = require('path');

const TASK_FILE = path.join(__dirname, 'tasks.json');

// Load tasks from the JSON file
function loadTasks() {
    if (!fs.existsSync(TASK_FILE)) {
        // Create the file with an empty array if it doesn't exist
        fs.writeFileSync(TASK_FILE, JSON.stringify([]));
        return [];
    }

    try {
        const data = fs.readFileSync(TASK_FILE, 'utf8');
        return JSON.parse(data || '[]'); // Parse empty JSON as an empty array
    } catch (error) {
        console.error('Error reading or parsing tasks.json. Resetting the file.');
        fs.writeFileSync(TASK_FILE, JSON.stringify([])); // Reset to an empty array
        return [];
    }
}

// Save tasks to the JSON file
function saveTasks(tasks) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };
