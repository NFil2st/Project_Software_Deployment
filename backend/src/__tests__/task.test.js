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
  await mongoose.connection.close();
});


describe('Integration Test: POST /api/tasks (Create Task)', () => {
  
  // Test Case 1: สร้าง Task สำเร็จ
  it('should create a new task and return 201 status with the task data', async () => {
    const taskData = {
      title: 'Monthly Salary',
      description: 'Income from primary job',
      amount: 50000,
      type: 'income',
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(201);

    // ตรวจสอบ Response
    expect(response.body).toHaveProperty('message', 'Task created successfully');
    expect(response.body.data).toHaveProperty('title', taskData.title);
    expect(response.body.data).toHaveProperty('_id');
    
    // ตรวจสอบในฐานข้อมูลจริง (MongoDB-Memory-Server)
    const savedTask = await Task.findById(response.body.data._id);
    expect(savedTask).not.toBeNull();
    expect(savedTask.amount).toBe(taskData.amount);
    expect(savedTask.type).toBe(taskData.type);

  }, 15000); // เพิ่ม Timeout สำหรับการทำงานกับฐานข้อมูล

  // Test Case 2: สร้าง Task ล้มเหลวเนื่องจากขาดฟิลด์ที่จำเป็น
  it('should return 500 status if a required field (title) is missing', async () => {
    const incompleteData = {
      description: 'Missing title',
      amount: 1000,
      type: 'expense',
    };

    const response = await request(app)
      .post('/api/tasks')
      .send(incompleteData)
      .expect(500); 

    expect(response.body).toHaveProperty('message', 'Error creating task');
    // ตรวจสอบข้อความ Error จาก Mongoose Validation
    expect(response.body.error).toContain('Path `title` is required.');
  }); 
});


// =========================================================================
// Integration Tests สำหรับฟังก์ชันใหม่ (SumTransactions)
// Endpoint: POST /api/sum (ตาม Route: router.post('/sum', ...))
// =========================================================================

describe('Integration Test: POST /api/sum (Sum Transactions)', () => {
    it('should correctly calculate total income, expense, and balance', async () => {
        const transactions = [
            { title: 'Salary', amount: 50000, type: 'income', category: 'Work' },
            { title: 'Rent', amount: 15000, type: 'expense', category: 'Housing' },
            { title: 'Bonus', amount: 10000, type: 'income', category: 'Work' },
            // ข้อมูลที่ไม่ถูกต้องควรถูกข้ามไปโดย Logic ของฟังก์ชัน sumTransactions
            { title: 'Garbage', amount: null, type: 'expense' }, 
        ];

        const response = await request(app)
            .post('/api/sum')
            .send(transactions)
            .expect(200);

        // ตรวจสอบผลรวมที่คำนวณได้
        expect(response.body.data.totalIncome).toBe(60000); // 50000 + 10000
        expect(response.body.data.totalExpense).toBe(15000); // 15000
        expect(response.body.data.balance).toBe(45000); // 60000 - 15000
    });

    it('should return 400 status if input is not an array', async () => {
        const response = await request(app)
            .post('/api/sum')
            .send({ data: 'not an array' }) // ส่ง Object แทน Array
            .expect(400);

        expect(response.body.error).toContain('transactions must be an array');
    });
});


// =========================================================================
// Integration Tests สำหรับฟังก์ชันใหม่ (Convert Currency)
// Endpoint: POST /api/currency/convert (ตาม Route: router.post('/currency/convert', ...))
// =========================================================================

describe('Integration Test: POST /api/currency/convert (Convert Currency)', () => {
    it('should successfully convert amount from USD to THB', async () => {
        const conversionData = {
            from: 'USD',
            to: 'THB',
            taskData: { title: 'Test Payment', amount: 100 }
        };

        const response = await request(app)
            .post('/api/currency/convert') // <--- แก้ไข Endpoint เป็น /currency/convert
            .send(conversionData)
            .expect(200);

        // ตรวจสอบว่าผลลัพธ์การแปลงถูกต้อง (100 * 36.50 = 3650.00)
        expect(response.body.data.amount).toBe(3650.00); 
        expect(response.body.data.currency).toBe('THB');
        expect(response.body.data.originalCurrency).toBe('USD');
    });
    
    it('should return 400 status if an unsupported currency is used', async () => {
        const conversionData = {
            from: 'YEN', // สกุลเงินที่ไม่มีใน mockExchangeRates
            to: 'THB',
            taskData: { title: 'Test Payment', amount: 100 }
        };

        const response = await request(app)
            .post('/api/currency/convert') // <--- แก้ไข Endpoint เป็น /currency/convert
            .send(conversionData)
            .expect(400);

        expect(response.body.error).toContain('Unsupported currency: YEN');
    });
});
