import { TaskStatus } from './TaskStatus';

export class Task {
  constructor(
    public id: number | undefined,
    public title: string,
    public description?: string,
    public dueDate?: Date,
    public status: TaskStatus = TaskStatus.PENDING
  ) {}
}
