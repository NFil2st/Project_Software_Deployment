const { createTask, getAllTasks, updateTask, deleteTask } = require('../services/taskService');

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

exports.getTasksHandler = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving tasks',
      error: error.message,
    });
  }
};

exports.updateTaskHandler = async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task',
      error: error.message,
    });
  }
};

exports.deleteTaskHandler = async (req, res) => {
  try {
    const deletedTask = await deleteTask(req.params.id);

    if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting task',
      error: error.message,
    });
  }
};