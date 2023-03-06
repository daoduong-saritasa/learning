import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map, Observable } from 'rxjs';

import { Group } from '../models/graphql/group';
import { Task } from '../models/graphql/task';

import { GroupByIdDto, GroupsDto } from './graphql/dtos/group';
import { TasksDto } from './graphql/dtos/task';
import { GroupMapper } from './graphql/mappers/group.mapper';
import { TaskMapper } from './graphql/mappers/task.mapper';

import { UPDATE_TASK_GROUP_STATUS } from './graphql/mutations/group.mutation';

import {
  GET_ALL_TASKS,
  GET_GROUP,
  GET_GROUPS,
} from './graphql/queries/group.query';

/**
 * Stateful service for storing/managing information about the current user.
 */
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly getAllTaskQuery: QueryRef<TasksDto>;

  public constructor(
    private apollo: Apollo,
    public groupMapper: GroupMapper,
    public taskMapper: TaskMapper,
  ) {
    this.getAllTaskQuery = this.apollo.watchQuery<TasksDto>({
      query: GET_ALL_TASKS,
    });
  }

  /** Get groups. */
  public getAllGroups(): Observable<Group[]> {
    return this.apollo
      .watchQuery<GroupsDto>({
      query: GET_GROUPS,
    })
      .valueChanges.pipe(map(result => result.data.allGroups.nodes.map(
        group => this.groupMapper.fromDto(group),
      )));
  }

  /**
   *  Get group detail.
   *  @param id Group id.
   **/
  public getGroupDetail(id: number): Observable<Group> {
    return this.apollo
      .watchQuery<GroupByIdDto>({
      query: GET_GROUP,
      variables: { id },
    })
      .valueChanges.pipe(map(result => this.groupMapper.fromDto(result.data.groupById)));
  }

  /** Get all tasks. */
  public getAllTasks(): Observable<Task[]> {
    return this.getAllTaskQuery.valueChanges.pipe(
      map(result => result.data.allTasks.nodes.map(
        task => this.taskMapper.fromDto(task),
      )),
    );
  }

  /**
   * Update task status for selected group.
   * @param taskId Task id.
   * @param groupId Group id.
   **/
  public updateTaskGroupStatus(taskId: number, groupId: number): void {
    this.apollo
      .mutate({
        mutation: UPDATE_TASK_GROUP_STATUS,
        variables: {
          taskId,
          groupId,
        },
      })
      .subscribe(() => this.getAllTaskQuery.refetch());
  }
}
