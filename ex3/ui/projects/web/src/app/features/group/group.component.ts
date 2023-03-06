import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupComponent {}
