import { Task } from '../model/Task';
import { TaskDTO } from '../dto/TaskDTO';

export function toDTO(task: Task): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
    status: task.status,
  };
}
