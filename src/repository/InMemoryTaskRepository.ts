import { ITaskRepository } from './ITaskRepository';
import { Task } from '../model/Task';
import { TaskStatus } from '../model/TaskStatus';

export class InMemoryTaskRepository implements ITaskRepository {
  private store: Task[] = [];
  private idSeq: number = 1;

  save(task: Task): Task {
    if (task.id == null) {
      task.id = this.idSeq++;
      this.store.push(task);
      return task;
    }
    const idx = this.store.findIndex(t => t.id === task.id);
    if (idx >= 0) {
      this.store[idx] = task;
      return task;
    } else {
      this.store.push(task);
      return task;
    }
  }

  findAll(status?: TaskStatus): Task[] {
    if (!status) return [...this.store];
    return this.store.filter(t => t.status === status);
  }

  findById(id: number): Task | undefined {
    return this.store.find(t => t.id === id);
  }

  delete(id: number): void {
    this.store = this.store.filter(t => t.id !== id);
  }

  findOverdue(today: Date): Task[] {
    const ts = today.getTime();
    return this.store.filter(t => t.dueDate != null && t.dueDate.getTime() < ts && t.status !== TaskStatus.DONE);
  }
}
