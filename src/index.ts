import express from 'express';
import cors from 'cors';

// Import routes
import auth from './routes/auth';
import task from './routes/tasks';
import currency from './routes/currency';

const app = express();
app.use(cors());
app.use(express.json());

// --- Route mapping ตาม Tester Guide ---
app.use('/auth', auth);
app.use('/tasks', task);
app.use('/currency', currency);

// --- Health check route สำหรับรอ server พร้อมใน CI ---
app.get('/health', (req, res) => res.status(200).send('OK'));

// 🚨 Run listen ถ้าไม่ใช่ test หรือบังคับด้วย RUN_E2E
if (process.env.NODE_ENV !== 'test' || process.env.RUN_E2E === 'true') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
