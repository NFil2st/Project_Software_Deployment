import { Router } from 'express';
const router = Router();

// Endpoint สำหรับเข้าสู่ระบบ (Login)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // การตรวจสอบแบบง่าย (Dummy Check) เพื่อให้ทำงานได้
  if (email === 'user@test.com' && password === 'p1') {
    return res.status(200).json({ token: 'dummy-token' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
