import { TaskStatus } from '../model/TaskStatus';

export interface TaskDTO {
  id?: number;
  title: string;
  description?: string;
  /** ISO-8601 date string (e.g., 2025-10-17T19:00:00.000Z) */
  dueDate?: string;
  status?: TaskStatus;
}
