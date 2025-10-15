import { Router, Request, Response } from 'express';

const router = Router();

// Spec A & B: Login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === 'user@test.com' && password === 'p1') {
    return res.status(200).json({ token: 'dummy-jwt-token' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
