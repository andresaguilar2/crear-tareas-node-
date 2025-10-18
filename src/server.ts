import express from 'express';
import taskRouter from './controller/taskRouter';

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);

app.get('/', (_req, res) => res.json({ ok: true, service: 'tasks-api' }));

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Not Found' }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Tasks API listening on http://localhost:${PORT}`);
});
