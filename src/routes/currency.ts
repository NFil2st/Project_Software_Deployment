import { Router } from 'express';
const router = Router();

router.get('/convert', (req, res) => {
  const { from, to, amount } = req.query;
  const numAmount = Number(amount);
  if (!from || !to || isNaN(numAmount)) {
    return res.status(400).json({ message: 'Invalid query parameters' });
  }
  const rate = 34.5; // Dummy conversion USD → THB
  return res.status(200).json({ result: numAmount * rate });
});

export default router;
