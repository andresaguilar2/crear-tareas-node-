import { ITaskRepository } from '../repository/ITaskRepository';
import { Task } from '../model/Task';
import { TaskStatus } from '../model/TaskStatus';

export class TaskService {
  constructor(private readonly repo: ITaskRepository) {}

  create(title: string, description?: string, dueDate?: Date): Task {
    if (!title || title.trim().length === 0) {
      throw new Error('Title is required');
    }
    const task = new Task(undefined, title.trim(), description?.trim() || undefined, dueDate);
    return this.repo.save(task);
  }

  list(status?: TaskStatus): Task[] {
    return this.repo.findAll(status);
  }

  updateStatus(id: number, status: TaskStatus): Task {
    const task = this.repo.findById(id);
    if (!task) throw new Error('Task not found');
    task.status = status;
    return this.repo.save(task);
  }

  delete(id: number): void {
    const task = this.repo.findById(id);
    if (!task) throw new Error('Task not found');
    this.repo.delete(id);
  }

  listOverdue(today: Date): Task[] {
    return this.repo.findOverdue(today);
  }
}
