import axios from 'axios';
import { shared } from './shared';

const BASE_URL = 'http://localhost:3000/api';

interface TaskResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  message?: string;
}

interface SummaryResponse {
  totalTasks: number;
  completedCount: number;
}

describe('Specs C–F: Task CRUD + Summary', () => {
  test('Spec C: POST /tasks - create record', async () => {
    const res = await axios.post<TaskResponse>(
      `${BASE_URL}/tasks`,
      { title: 'Test Task', description: 'Sample task', type: 'todo' },
      { headers: { Authorization: `Bearer ${shared.token}` } }
    );
    expect(res.status).toBe(201);
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

  test('Spec E: PUT /tasks/:id - update record', async () => {
    const res = await axios.put<TaskResponse>(
      `${BASE_URL}/tasks/${shared.taskId}`,
      { title: 'Updated Task', description: 'Updated description', type: 'done' },
      { headers: { Authorization: `Bearer ${shared.token}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.title).toBe('Updated Task');
  });

  test('Spec F: DELETE /tasks/:id - delete record', async () => {
    const res = await axios.delete<TaskResponse>(
      `${BASE_URL}/tasks/${shared.taskId}`,
      { headers: { Authorization: `Bearer ${shared.token}` } }
    );
    expect(res.status).toBe(200);
    expect(res.data.message).toContain('success');
    shared.taskId = '';
  });
});
