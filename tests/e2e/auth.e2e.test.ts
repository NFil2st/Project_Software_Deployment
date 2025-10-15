import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// --- Interfaces for typing responses ---
interface LoginResponse {
  token: string;
}

interface TaskResponse {
  id: string;
  title: string;
  description: string;
  type: string;
}

// --- Test Data ---
const validUser = { email: 'user@test.com', password: 'p1' };
const invalidUser = { email: 'user@test.com', password: 'wrong' };

let token: string;
let taskId: string;

describe('Specs A–F: E2E Tests', () => {

  // Spec A: Login with valid credentials
  test('Spec A: POST /auth/login - valid', async () => {
    const res = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, validUser);
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
    token = res.data.token; // save token for later tests
  });

  // Spec B: Login with invalid credentials
  test('Spec B: POST /auth/login - invalid', async () => {
    try {
      await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, invalidUser);
    } catch (err: any) {
      expect(err.response.status).toBe(401);
      expect(err.response.data.message).toBeDefined();
    }
  });

  // Spec C: Auth guard
  test('Spec C: GET /protected - auth guard', async () => {
    // without token
    try {
      await axios.get(`${BASE_URL}/protected`);
    } catch (err: any) {
      expect(err.response.status).toBe(401);
    }

    // with token
    const res = await axios.get(`${BASE_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(res.status).toBe(200);
  });

  // Spec D: Create a task record
  test('Spec D: POST /tasks - create record', async () => {
    const res = await axios.post<TaskResponse>(`${BASE_URL}/tasks`, {
      title: 'Test Task',
      description: 'Sample task for E2E',
      type: 'todo'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(res.status).toBe(201);
    expect(res.data.id).toBeDefined();
    taskId = res.data.id;
  });

  // Spec E: Validation - missing fields
  test('Spec E: POST /tasks - missing fields', async () => {
    try {
      await axios.post(`${BASE_URL}/tasks`, { title: 'Missing description' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err: any) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toContain('validation');
    }
  });

  // Spec F: Update a task record
  test('Spec F: PUT /tasks/:id - update record', async () => {
    const res = await axios.put<TaskResponse>(`${BASE_URL}/tasks/${taskId}`, {
      title: 'Updated Task',
      description: 'Updated description',
      type: 'done'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(res.status).toBe(200);
    expect(res.data.title).toBe('Updated Task');
  });

});
