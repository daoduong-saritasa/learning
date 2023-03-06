/** Task interface representing a task. */
export interface Task {

  /** Task name. */
  name: string;

  /** Task id. */
  id: number;

  /** Task description. */
  description: string;

  /** Task groups. */
  taskGroups: TaskGroup[];
}

/** TaskGroup interface representing a task status in a group.  */
export interface TaskGroup {

  /** Time when the task was sent. */
  sentAt: string;

  /** Group id. */
  groupId: number;
}
