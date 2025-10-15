import express from 'express';
import authRouter from './routes/authRouter';
import tasksRouter from './routes/tasksRouter';
import currencyRouter from './routes/currencyRouter';
import sumRouter from './routes/sumRouter';


const app = express();
app.use(express.json());

app.use('/api/sum', sumRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/currency', currencyRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // สำหรับ E2E test
