import express, { Request, Response } from 'express';
import { TaskService } from '../service/TaskService';
import { InMemoryTaskRepository } from '../repository/InMemoryTaskRepository';
import { parseTaskStatus, TaskStatus } from '../model/TaskStatus';
import { toDTO } from '../mapper/taskMapper';

const router = express.Router();

// Simple singleton instances for demo
const repo = new InMemoryTaskRepository();
const service = new TaskService(repo);

// POST /tasks
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body || {};
    const parsedDate = dueDate ? new Date(dueDate) : undefined;
    if (parsedDate && isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid dueDate. Use ISO-8601 string.' });
    }
    const created = service.create(title, description, parsedDate);
    return res.status(201).json(toDTO(created));
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Bad Request' });
  }
});

// GET /tasks?status=
router.get('/', (req: Request, res: Response) => {
  const statusStr = req.query.status as string | undefined;
  const status = parseTaskStatus(statusStr);
  if (statusStr && status === undefined) {
    return res.status(400).json({ error: 'Invalid status. Use PENDING|IN_PROGRESS|DONE' });
  }
  const list = service.list(status);
  return res.json(list.map(toDTO));
});

// PATCH /tasks/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

  const { status } = req.body || {};
  const parsed = parseTaskStatus(status);
  if (!parsed) return res.status(400).json({ error: 'Invalid status. Use PENDING|IN_PROGRESS|DONE' });

  try {
    const updated = service.updateStatus(id, parsed);
    return res.json(toDTO(updated));
  } catch (err: any) {
    return res.status(404).json({ error: err.message || 'Not found' });
  }
});

// DELETE /tasks/:id
router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    service.delete(id);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(404).json({ error: err.message || 'Not found' });
  }
});

// GET /tasks/overdue
router.get('/overdue', (req: Request, res: Response) => {
  const list = service.listOverdue(new Date());
  return res.json(list.map(toDTO));
});

export default router;
