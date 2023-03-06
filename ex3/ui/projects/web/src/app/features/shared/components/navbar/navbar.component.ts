import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@saanbo/common/core/models/graphql/user';
import { UserService } from '@saanbo/common/core/services/user.service';
import { toggleExecutionState } from '@saanbo/common/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

/** Navbar component. */
@Component(
  {
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  },
)

export class NavbarComponent {
  /** Whether the controls should be marked as in loading state. */
  protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** User. */
  public readonly user$: Observable<User | null>;

  public constructor(
    private readonly userService: UserService,
  ) {
    this.user$ = this.userService.currentUser$.pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** Handles click on logout button. */
  public onLogoutClick(): void {
    this.userService.logout()
      .pipe(
        toggleExecutionState(this.isLoading$),
      )
      .subscribe();
  }
}
