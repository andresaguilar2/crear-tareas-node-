import { Task } from '../model/Task';
import { TaskStatus } from '../model/TaskStatus';

export interface ITaskRepository {
  save(task: Task): Task; // create or update
  findAll(status?: TaskStatus): Task[];
  findById(id: number): Task | undefined;
  delete(id: number): void;
  findOverdue(today: Date): Task[];
}
