import express from 'express';
import authRouter from './routes/authRouter';
import tasksRouter from './routes/tasksRouter';
import currencyRouter from './routes/currencyRouter';

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);       // รวม task CRUD + summary
app.use('/api/currency', currencyRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
