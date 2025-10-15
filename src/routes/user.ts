import { Router, Request, Response } from 'express';

const router = Router();

// ตัวอย่าง route
router.get('/', (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'Test User' }]);
});

router.post('/', (req: Request, res: Response) => {
  const user = req.body;
  user.id = 2; // assign dummy id
  res.status(201).json(user);
});

// ✅ ต้องมี export
export default router;
