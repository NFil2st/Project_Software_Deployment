// src/function/deleteTask.js

const Task = require('../models/taskModel');

/**
 * ลบ task ตาม id
 * @param {string} id - task id
 * @param {object} [taskData] - ข้อมูลเพิ่มเติม เช่น userId (ถ้ามีระบบสิทธิ์)
 * @returns {Promise<object>} - ผลลัพธ์การลบ
 */
async function deleteTask(id, taskData = {}) {
  try {
    const task = await Task.findById(id);

    if (!task) {
      return { success: false, message: 'Task not found' };
    }

    // ถ้ามีระบบสิทธิ์ เช่นต้องตรวจสอบว่า user เป็นเจ้าของ task
    if (taskData.userId && task.userId && task.userId.toString() !== taskData.userId.toString()) {
      return { success: false, message: 'Unauthorized to delete this task' };
    }

    await Task.findByIdAndDelete(id);

    return {
      success: true,
      message: 'Task deleted successfully',
      deletedId: id,
    };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, message: 'Internal server error', error: error.message };
  }
}

module.exports = deleteTask;
