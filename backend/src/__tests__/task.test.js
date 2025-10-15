const request = require('supertest');
const app = require('../../app'); 
const Task = require('../models/taskModel'); 
const db = require('./setup'); // Import setup เพื่อเข้าถึงฟังก์ชัน clearDatabase

// เนื่องจาก setupFilesAfterEnv เรียก db.connect() 
// เราควรใช้ afterEach เพื่อเคลียร์ DB และตรวจสอบให้แน่ใจว่ามันเสร็จ
afterEach(async () => {
  await db.clearDatabase();
});

// เราเพิ่ม afterAll และ closeDatabase เพื่อให้มั่นใจว่า Jest ปิดอย่างถูกต้อง
// ถึงแม้ว่า setupFilesAfterEnv จะทำแล้ว แต่การมีไว้ในไฟล์ test ช่วยให้มั่นใจ
afterAll(async () => {
    await db.closeDatabase();
});


describe('Integration Test: POST /api/tasks (Create Task)', () => {
  
  // *** สำคัญ: เพิ่ม timeout ให้นานขึ้นสำหรับการทำงานกับฐานข้อมูล ***
  it('should create a new task and return 201 status with the task data', async () => {
    const taskData = {
      title: 'Monthly Salary',
      description: 'Income from primary job',
      amount: 50000,
      type: 'income',
    };
    
    // ... (โค้ดที่เหลือ)
    
  }, 10000); // <-- เพิ่ม timeout เป็น 10 วินาที

  // ... (Test case ที่ 2)
  it('should return 500 status if a required field (title) is missing', async () => {
    // ... (โค้ดที่เหลือ)
  }); // ไม่จำเป็นต้องเพิ่ม timeout
});