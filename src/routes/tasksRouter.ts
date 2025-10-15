import { Router, Request, Response } from 'express';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'todo' | 'done';
}

export const tasks: Task[] = []; // export เพื่อใช้งานใน test
let taskCounter = 1;

const router = Router();

// Spec C: Create task
router.post('/', (req: Request, res: Response) => {
  const { title, description, type } = req.body;
  if (!title || !description || !type) {
    return res.status(400).json({ message: 'Validation error: missing fields' });
  }
  const newTask: Task = {
    id: taskCounter.toString(),
    title,
    description,
    type,
  };
  taskCounter++;
  tasks.push(newTask);
  res.status(201).json(newTask);
});
router.use((req, res, next) => {
  console.log('TaskRouter received:', req.method, req.path);
  next();
});

// Spec D: Summary
router.get('/summary', (req: Request, res: Response) => {
  console.log('GET /summary hit'); 
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.type === 'done').length;
  res.status(200).json({ totalTasks, completedCount });
});



// Spec E: Update task
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { title, description, type } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (type) task.type = type;

  res.status(200).json(task);
});

// Spec F: Delete task
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(index, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
});

export default router;
