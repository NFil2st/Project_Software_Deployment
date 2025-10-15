import axios from 'axios';
import { shared } from './shared';

const BASE_URL = 'http://localhost:3000/api';

interface LoginResponse { token: string }

const validUser = { email: 'user@test.com', password: 'p1' };
const invalidUser = { email: 'user@test.com', password: 'wrong' };

// type guard manual
function isAxiosError(err: unknown): err is { response?: { status: number; data: any } } {
  return typeof err === 'object' && err !== null && 'response' in err;
}

describe('Specs A–B: Auth', () => {

  test('Spec A: POST /auth/login - valid', async () => {
    const res = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, validUser);
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
    shared.token = res.data.token;
  });

  test('Spec B: POST /auth/login - invalid', async () => {
    try {
      await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, invalidUser);
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        expect(err.response.status).toBe(401);
        expect(err.response.data.message).toBeDefined();
      } else {
        throw err;
      }
    }
  });

});
