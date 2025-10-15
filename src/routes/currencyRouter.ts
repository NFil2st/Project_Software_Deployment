import { Router, Request, Response } from 'express';

const router = Router();

// Spec G: Currency conversion
router.get('/convert', (req: Request, res: Response) => {
  const { from, to, amount } = req.query;
  const result = Number(amount) * 35; // dummy conversion
  res.status(200).json({ from, to, amount, result });
});

export default router;
