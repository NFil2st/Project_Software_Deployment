import express from 'express';
import cors from 'cors';
// เพิ่มส่วนขยาย .js เพื่อช่วย tsc ให้ค้นหาไฟล์ใน 'dist' ได้ง่ายขึ้น
import auth from './routes/auth.js'; 
import task from './routes/tasks.js';
import currency from './routes/currency.js';

const app = express();
app.use(cors());
app.use(express.json());

// --- Route mapping ตาม Tester Guide ---
app.use('/auth', auth);
app.use('/tasks', task);
app.use('/currency', currency);

// 🚨 ไม่ run listen() ถ้า NODE_ENV=test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
