import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

interface CurrencyResponse {
  result: number;
}

// manual type guard
function isAxiosError(err: unknown): err is { response?: { status: number; data: any } } {
  return typeof err === 'object' && err !== null && 'response' in err;
}

describe('Spec G: Currency Conversion', () => {
  test('GET /currency/convert', async () => {
    try {
      const res = await axios.get<CurrencyResponse>(`${BASE_URL}/currency/convert`, {
        params: { from: 'USD', to: 'THB', amount: 10 }
      });
      expect(res.status).toBe(200);
      expect(res.data.result).toBeDefined();
      expect(typeof res.data.result).toBe('number');
    } catch (err: unknown) {
      if (isAxiosError(err) && err.response) {
        throw new Error(`Currency conversion failed: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
      } else {
        throw err;
      }
    }
  });
});
