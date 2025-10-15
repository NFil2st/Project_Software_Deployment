import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import currencyRoutes from './routes/currency';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/currency', currencyRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('Server running on port 3000'));
}

export default app;
