import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const tasks: Record<string, any> = {};

router.post('/', (req, res) => {
  const { title, description, type } = req.body;
  if (!title || !description || !type) {
    return res.status(400).json({ message: 'validation error: missing fields' });
  }
  const id = uuidv4();
  tasks[id] = { id, title, description, type };
  return res.status(201).json(tasks[id]);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!tasks[id]) return res.status(404).json({ message: 'Task not found' });
  const { title, description, type } = req.body;
  tasks[id] = { id, title, description, type };
  return res.status(200).json(tasks[id]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!tasks[id]) return res.status(404).json({ message: 'Task not found' });
  delete tasks[id];
  return res.status(200).json({ message: 'Task deleted successfully' });
});

export default router;
