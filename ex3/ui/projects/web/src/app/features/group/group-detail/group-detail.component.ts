import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '@saanbo/common/core/models/graphql/group';
import { GroupService } from '@saanbo/common/core/services/group.service';
import { assertNonNullWithReturn } from '@saanbo/common/core/utils/assert-non-null';
import { TaskGroup, Task } from '@saanbo/common/core/models/graphql/task';

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailComponent {

  /** Group. */
  public readonly group$: Observable<Group>;

  /** Group id. */
  public readonly groupId$: Observable<string | null> = this.route.paramMap.pipe(
    map(params => params.get('id')),
    filter(id => !!id),
  );

  /** Tasks. */
  public readonly tasks$: Observable<Task[]>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly groupService: GroupService,
  ) {
    this.group$ = this.groupId$.pipe(
      switchMap(id =>
        this.groupService.getGroupDetail(parseInt(assertNonNullWithReturn(id), 10))),

    );
    this.tasks$ = this.groupService.getAllTasks();
  }

  /**
   * Track by task.
   * @param index Index.
   * @param task Task.
   */
  public trackByTask(index: number, task: Task): number {
    return task.id;
  }

  /**
   * Send task.
   * @param taskId Task id.
   * @param groupId Group id.
   */
  public onSendTaskClick(taskId: number, groupId: number): void {
    this.groupService.updateTaskGroupStatus(taskId, groupId);
  }

  /**
   * Check task status.
   * @param taskGroups Task groups.
   * @param groupId Group id.
   */
  public checkTaskStatus(taskGroups: TaskGroup[], groupId: number): boolean {
    return taskGroups.some(taskGroup => taskGroup.groupId === groupId && taskGroup.sentAt !== null);
  }
}
