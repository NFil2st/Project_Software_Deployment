import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

// 🚨 อย่ารัน listen() ถ้าเป็น test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
