export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export function parseTaskStatus(value?: string): TaskStatus | undefined {
  if (!value) return undefined;
  const up = value.toUpperCase();
  if (up in TaskStatus) return TaskStatus[up as keyof typeof TaskStatus];
  return undefined;
}
