const request = require('supertest');
const app = require('../../app');
const Task = require('../models/taskModel');
const db = require('./setup');
const mongoose = require('mongoose');

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe('Integration Tests: Task + Transactions + Currency', () => {
  let createdTaskId;

  // สร้าง Task ก่อนเทสที่ต้องใช้มัน
  beforeEach(async () => {
    const task = new Task({
      title: 'Initial Task',
      description: 'For testing',
      amount: 1000,
      type: 'income',
    });
    const saved = await task.save();
    createdTaskId = saved._id;
  });

  // 🧩 CREATE TEST
  describe('POST /api/tasks', () => {
    it('should create a task successfully', async () => {
      const taskData = {
        title: 'Salary',
        description: 'Monthly salary',
        amount: 50000,
        type: 'income',
      };

      const res = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(res.body.message).toBe('Task created successfully');
      expect(res.body.data).toHaveProperty('title', 'Salary');
    });

    it('should return 500 if title is missing', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ description: 'No title', type: 'income' })
        .expect(500);

      expect(res.body.error).toContain('Path `title` is required.');
    });
  });

  // 🗑 DELETE TEST
  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task successfully', async () => {
      const taskRes = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to delete', description: 'desc', type: 'todo' })
        .expect(201);

      const id = taskRes.body.data._id;

      const res = await request(app)
        .delete(`/api/tasks/${id}`)
        .expect(200);

      expect(res.body.message).toContain('success');
    });
  });


  // ✏️ UPDATE TEST
  describe('PUT /api/tasks/:id', () => {
    it('should update a task successfully', async () => {
      const res = await request(app)
        .put(`/api/tasks/${createdTaskId}`)
        .send({ title: 'Updated Task', description: 'Updated', type: 'done' })
        .expect(200);

      expect(res.body.data).toHaveProperty('title', 'Updated Task');
    });

    it('should return 404 if task not found', async () => {
      const fakeId = '652bcf7f7f7f7f7f7f7f7f7f';
      const res = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .send({ title: 'Updated Task' })
        .expect(404);

      expect(res.body.message).toBe('Task not found');
    });
  });

  // 💰 SUM TRANSACTION TEST
  describe('POST /api/sum', () => {
    it('should return correct total income, expense, and balance', async () => {
      const transactions = [
        { type: 'income', amount: 1000 },
        { type: 'income', amount: 2000 },
        { type: 'expense', amount: 500 },
      ];

      const res = await request(app)
        .post('/api/sum')
        .send(transactions)
        .expect(200);

      expect(res.body.data).toEqual({
        totalIncome: 3000,
        totalExpense: 500,
        balance: 2500,
      });
    });

    it('should return 400 if body is not an array', async () => {
      const res = await request(app)
        .post('/api/sum')
        .send({ type: 'income', amount: 100 })
        .expect(400);

      expect(res.body.error).toContain('transactions must be an array');
    });
  });

  // 💱 CONVERT CURRENCY TEST
  describe('POST /api/currency/convert', () => {
    it('should convert USD to THB correctly', async () => {
      const res = await request(app)
        .post('/api/currency/convert')
        .send({
          from: 'USD',
          to: 'THB',
          taskData: { amount: 10 },
        })
        .expect(200);

      expect(res.body.data.currency).toBe('THB');
      expect(res.body.data.amount).toBeCloseTo(365.0, 1);
    });

    it('should return error if currency unsupported', async () => {
      const res = await request(app)
        .post('/api/currency/convert')
        .send({
          from: 'BTC',
          to: 'USD',
          taskData: { amount: 10 },
        })
        .expect(400);

      expect(res.body.error).toContain('Unsupported currency');
    });
  });
});
