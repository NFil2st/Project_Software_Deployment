const Task = require('../models/taskModel');

exports.createTask = async (taskData) => {
  const newTask = new Task(taskData);
  await newTask.save();
  return newTask;
};