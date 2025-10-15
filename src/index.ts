import express from 'express';
import cors from 'cors';

// แก้ไข: กลับมาใช้การ Import แบบมาตรฐานของ TypeScript 
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

// 🚨 ไม่ run listen() ถ้า NODE_ENV=test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


export default app;
