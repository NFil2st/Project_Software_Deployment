"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const express_1 = require("express");
exports.tasks = []; // export เพื่อใช้งานใน test
let taskCounter = 1;
const router = (0, express_1.Router)();
// Spec C: Create task
router.post('/', (req, res) => {
    const { title, description, type } = req.body;
    if (!title || !description || !type) {
        return res.status(400).json({ message: 'Validation error: missing fields' });
    }
    const newTask = {
        id: taskCounter.toString(),
        title,
        description,
        type,
    };
    taskCounter++;
    exports.tasks.push(newTask);
    res.status(201).json(newTask);
});
router.use((req, res, next) => {
    console.log('TaskRouter received:', req.method, req.path);
    next();
});
// Spec D: Summary
router.get('/summary', (req, res) => {
    console.log('GET /summary hit');
    const totalTasks = exports.tasks.length;
    const completedCount = exports.tasks.filter(t => t.type === 'done').length;
    res.status(200).json({ totalTasks, completedCount });
});
// Spec E: Update task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const task = exports.tasks.find(t => t.id === id);
    if (!task)
        return res.status(404).json({ message: 'Task not found' });
    const { title, description, type } = req.body;
    if (title)
        task.title = title;
    if (description)
        task.description = description;
    if (type)
        task.type = type;
    res.status(200).json(task);
});
// Spec F: Delete task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = exports.tasks.findIndex(t => t.id === id);
    if (index === -1)
        return res.status(404).json({ message: 'Task not found' });
    exports.tasks.splice(index, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});
exports.default = router;
