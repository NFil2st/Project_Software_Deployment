import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

describe('User API E2E Tests', () => {
  const user: User = { name: 'Tester', email: 'test@test.com', password: '1234' };

  test('POST /users -> should create user', async () => {
    const res = await axios.post<User>(`${BASE_URL}/users`, user);
    expect(res.status).toBe(201);
    expect(res.data.email).toBe(user.email);
  });

  test('GET /users -> should return array', async () => {
    const res = await axios.get<User[]>(`${BASE_URL}/users`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });
});
