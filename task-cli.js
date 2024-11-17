#!/usr/bin/env node

const { addTask, updateTask, deleteTask, markTask, listTasks } = require('./taskManager');

// Parse command-line arguments
const [action, ...args] = process.argv.slice(2);

switch (action) {
    case 'add':
        addTask(args.join(' '));
        break;
    case 'update':
        updateTask(Number(args[0]), args.slice(1).join(' '));
        break;
    case 'delete':
        deleteTask(Number(args[0]));
        break;
    case 'mark-in-progress':
        markTask(Number(args[0]), 'in-progress');
        break;
    case 'mark-done':
        markTask(Number(args[0]), 'done');
        break;
    case 'list':
        listTasks(args[0] || 'all');
        break;
    default:
        console.log('Invalid command. Use: add, update, delete, mark-in-progress, mark-done, list');
}
