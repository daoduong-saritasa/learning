import { inject, Injectable } from '@angular/core';

import { Task, TaskGroup } from '@saanbo/common/core/models/graphql/task';

import { IMapperFromDto } from '../../mappers/mappers';
import { TaskDto, TaskGroupDto } from '../dtos/task';

/** Task mapper. */
@Injectable({
  providedIn: 'root',
})
export class TaskMapper implements IMapperFromDto<TaskDto, Task> {
  private taskGroupMapper = inject(TaskGroupMapper);

  /** @inheritdoc */
  public fromDto(data: TaskDto): Task {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      taskGroups: data.taskGroupsByTaskId.nodes.map(taskGroup => (this.taskGroupMapper.fromDto(taskGroup))),
    };
  }
}

/** Task group mapper. */
@Injectable({
  providedIn: 'root',
})
export class TaskGroupMapper implements IMapperFromDto<TaskGroupDto, TaskGroup> {
  /** @inheritdoc */
  public fromDto(data: TaskGroupDto): TaskGroup {
    return {
      sentAt: data.sentAt,
      groupId: data.groupId,
    };
  }
}
