import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Group } from '@saanbo/common/core/models/graphql/group';
import { GroupService } from '@saanbo/common/core/services/group.service';
import { Observable } from 'rxjs';

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent {
  /** Groups. */
  public readonly groups$: Observable<Group[]>;

  private groupService = inject(GroupService);

  public constructor() {
    this.groups$ = this.groupService.getAllGroups();
  }

  /**
   * Group trackby funtion.
   * @param index Index of the group.
   * @param group Group.
   */
  public groupTrackBy(index: unknown, group: { id: number; }): number {
    return group.id;
  }
}
