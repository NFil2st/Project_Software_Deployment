const { createTask, getAllTasks, updateTask, deleteTask } = require('../services/taskService');

exports.createTaskHandler = async (req, res) => {
  try {
    const taskData = req.body;
    
    // Validation
    if (!taskData.title) {
      return res.status(400).json({
        error: 'Title is required'
      });
    }
    
    if (!taskData.description || taskData.description.trim() === '') {
      return res.status(400).json({
        error: 'Description cannot be empty'
      });
    }
    
    if (taskData.type !== 'income' && taskData.type !== 'expense') {
      return res.status(400).json({
        error: 'Type must be either income or expense'
      });
    }
    
    if (taskData.type === 'income' && taskData.amount < 0) {
      return res.status(400).json({
        error: 'Income amount cannot be negative'
      });
    }
    
    if (taskData.type === 'expense' && taskData.amount > 0) {
      return res.status(400).json({
        error: 'Expense amount cannot be positive'
      });
    }
    
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
    const updateData = req.body;
    
    // Validation for update
    if (updateData.type && updateData.type !== 'income' && updateData.type !== 'expense') {
      return res.status(400).json({
        error: 'Type must be either income or expense'
      });
    }
    
    if (updateData.type === 'income' && updateData.amount < 0) {
      return res.status(400).json({
        error: 'Income amount cannot be negative'
      });
    }
    
    if (updateData.type === 'expense' && updateData.amount > 0) {
      return res.status(400).json({
        error: 'Expense amount cannot be positive'
      });
    }
    
    if (updateData.description && updateData.description.trim() === '') {
      return res.status(400).json({
        error: 'Description cannot be empty'
      });
    }
    
    const updatedTask = await updateTask(req.params.id, updateData);
    
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