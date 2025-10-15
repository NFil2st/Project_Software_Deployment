const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

const validUser = { email: 'user@test.com', password: 'p1' };
const invalidUser = { email: 'user@test.com', password: 'wrong' };

let token;
let taskId;

describe('Specs A–G: E2E Tests', () => {

  test('Spec A: POST /auth/login - valid', async () => {
    const res = await axios.post(`${BASE_URL}/auth/login`, validUser);
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
    token = res.data.token;
  });

  test('Spec B: POST /auth/login - invalid', async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, invalidUser);
    } catch (err) {
      expect(err.response.status).toBe(401);
      expect(err.response.data.message).toBeDefined();
    }
  });

  test('Spec C: POST /tasks - create record', async () => {
    const res = await axios.post(`${BASE_URL}/tasks`, {
      title: 'Test Task',
      description: 'Sample task for E2E',
      type: 'todo'
    }, { headers: { Authorization: `Bearer ${token}` } });
    expect(res.status).toBe(201);
    expect(res.data.id).toBeDefined();
    taskId = res.data.id;
  });

  test('Spec D: POST /tasks - missing fields', async () => {
    try {
      await axios.post(`${BASE_URL}/tasks`, { title: 'Missing description' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toContain('validation');
    }
  });

  test('Spec E: PUT /tasks/:id - update record', async () => {
    const res = await axios.put(`${BASE_URL}/tasks/${taskId}`, {
      title: 'Updated Task',
      description: 'Updated description',
      type: 'done'
    }, { headers: { Authorization: `Bearer ${token}` } });
    expect(res.status).toBe(200);
    expect(res.data.title).toBe('Updated Task');
  });

  test('Spec F: DELETE /tasks/:id - delete record', async () => {
    const res = await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(res.status).toBe(200);
    expect(res.data.message).toContain('success');
    taskId = null;
  });

  test('Spec G: GET /currency/convert - currency conversion', async () => {
    const res = await axios.get(`${BASE_URL}/currency/convert`, {
      params: { from: 'USD', to: 'THB', amount: 10 }
    });
    expect(res.status).toBe(200);
    expect(res.data.result).toBeDefined();
    expect(typeof res.data.result).toBe('number');
  });

  // Cleanup task if still exists
  afterAll(async () => {
    if (taskId) {
      try {
        await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Cleanup: task may already be deleted');
      }
    }
  });

});
