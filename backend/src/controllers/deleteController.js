// src/controllers/deleteController.js

const deleteTask = require('../function/deleteTask');

/**
 * Controller สำหรับลบ task
 * DELETE /tasks/:id
 */
async function deleteTaskController(req, res) {
    const { id } = req.params;
    const userData = req.user || {}; // ถ้ามี middleware auth จะเก็บ user ไว้ใน req.user

    const result = await deleteTask(id, userData);

    if (!result.success) {
        const status = result.message === 'Task not found'
            ? 404
            : result.message === 'Unauthorized to delete this task'
                ? 403
                : 500;
        return res.status(status).json(result);
    }

    return res.status(200).json(result);
}

module.exports = { deleteTaskController };
