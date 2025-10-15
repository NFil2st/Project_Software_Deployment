const { createTask } = require('../services/taskService');

async function createTaskFunction(taskData) {
  try {
    const newTask = await createTask(taskData);
    console.log('✅ Task created successfully:', newTask.title);
    return newTask;
  } catch (error) {
    console.error('❌ Failed to create task:', error.message);
    throw error;
  }
}

module.exports = { createTaskFunction };
