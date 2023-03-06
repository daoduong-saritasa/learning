import { Nodes } from './nodes';

/** Task response. */
export interface TaskDto {

  /** Task name. */
  name: string;

  /** Task id. */
  id: number;

  /** Task description. */
  description: string;

  /** Task group. */
  taskGroupsByTaskId: Nodes<TaskGroupDto>;
}

/** Task group response. */
export interface TaskGroupDto {

  /** Time which the task was sent. */
  sentAt: string;

  /** Group id. */
  groupId: number;
}

/** Task response. */
export interface TasksDto {

  /** Tasks. */
  allTasks: Nodes<TaskDto>;
}
