"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const tasks = {};
router.post('/', (req, res) => {
    const { title, description, type } = req.body;
    if (!title || !description || !type) {
        return res.status(400).json({ message: 'validation error: missing fields' });
    }
    const id = (0, uuid_1.v4)();
    tasks[id] = { id, title, description, type };
    return res.status(201).json(tasks[id]);
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    if (!tasks[id])
        return res.status(404).json({ message: 'Task not found' });
    const { title, description, type } = req.body;
    tasks[id] = { id, title, description, type };
    return res.status(200).json(tasks[id]);
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!tasks[id])
        return res.status(404).json({ message: 'Task not found' });
    delete tasks[id];
    return res.status(200).json({ message: 'Task deleted successfully' });
});
exports.default = router;
