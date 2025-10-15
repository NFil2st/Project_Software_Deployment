const { createTask } = require('../services/taskService');

exports.createTaskHandler = async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await createTask(taskData);
    res.status(201).json({
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating task',
      error: error.message,
    });
  }
};
