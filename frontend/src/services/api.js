// services/api.js
const API_BASE = 'http://localhost:3000/api';


async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text; }
}

export async function getTasks() {
  return request('/tasks', { method: 'GET' });
}

export async function createTask(task) {
  return request('/tasks', { method: 'POST', body: JSON.stringify(task) });
}

export async function updateTask(id, task) {
  return request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, { method: 'DELETE' });
}

export async function sumTransactions(transactions) {
  // backend expects body = array of transactions
  return request('/sum', { method: 'POST', body: JSON.stringify(transactions) });
}

export async function convertCurrency(from, to, taskData) {
  return request('/currency/convert', { method: 'POST', body: JSON.stringify({ from, to, taskData }) });
}

export default { getTasks, createTask, updateTask, deleteTask, sumTransactions, convertCurrency };
