import axios from 'axios';
import { shared } from './shared';

const BASE_URL = 'http://localhost:3000/api';

interface TaskResponse {
  id: string;
  title: string;
  description: string;
  type: string;
}

interface SummaryResponse {
  totalTasks: number;
  completedCount: number;
}

function isAxiosError(err: unknown): err is { response?: { status: number; data: any } } {
  return typeof err === 'object' && err !== null && 'response' in err;
}

describe('Specs C–D: Task Creation + Summary', () => {

  test('Spec C: POST /tasks - create record', async () => {
    const res = await axios.post<TaskResponse>(
      `${BASE_URL}/tasks`,
      { title: 'Test Task', description: 'Sample task', type: 'todo' },
      { headers: { Authorization: `Bearer ${shared.token}` } }
    );
    expect(res.status).toBe(201);
    expect(res.data.id).toBeDefined();
    shared.taskId = res.data.id;
  });

  test('Spec D: GET /tasks/summary - summary', async () => {
    const res = await axios.get<SummaryResponse>(
      `${BASE_URL}/tasks/summary`,
      { headers: { Authorization: `Bearer ${shared.token}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.totalTasks).toBeDefined();
    expect(res.data.completedCount).toBeDefined();
  });

});
