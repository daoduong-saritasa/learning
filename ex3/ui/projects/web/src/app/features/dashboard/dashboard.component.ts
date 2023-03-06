import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from '@saanbo/common/core/models/user';
import { AppConfig } from '@saanbo/common/core/services/app.config';
import { UserService } from '@saanbo/common/core/services/user.service';
import { toggleExecutionState } from '@saanbo/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const getGroups = gql`
query MyQuery {
  allGroups {
    nodes {
      name
    }
  }
}

`;

/** Placeholder dashboard. */
@UntilDestroy()
@Component({
  selector: 'saanbow-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  /** Whether the controls should be marked as in loading state. */
  protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Current user. */
  public readonly user$: Observable<User | null>;

  /** Groups. */
  public readonly groups$: Observable<any>;

  public constructor(
    public readonly userService: UserService,
    public readonly appConfigService: AppConfig,
    private apollo: Apollo,
  ) {
    this.user$ = this.userService.currentUser$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );

    this.groups$ = this.apollo.watchQuery({
      query: getGroups,
    }).valueChanges.pipe(
      tap((result: any) => console.log(result)),
      map((result: any) => result.data && result.data.allGroups.nodes)
    )
  }

  /** Handles click on logout button. */
  public onLogoutClick(): void {
    this.userService.logout()
      .pipe(
        toggleExecutionState(this.isLoading$),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
