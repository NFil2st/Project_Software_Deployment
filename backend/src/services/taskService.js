const Task = require('../models/taskModel');

exports.createTask = async (taskData) => {
  const newTask = new Task(taskData);
  await newTask.save();
  return newTask;
};

exports.getAllTasks = async () => {
  return await Task.find();
};

exports.updateTask = async (taskId, updateData) => {
  return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
};

exports.deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};