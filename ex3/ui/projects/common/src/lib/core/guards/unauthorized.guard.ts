import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Guard prevents user from accessing if a user is not logged in. */
export function unauthorizedGuard(): Observable<boolean | UrlTree> {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isAuthorized$.pipe(
    map(isAuthorized => (isAuthorized ? true : router.parseUrl('/auth/login'))),
    first(),
  );
}
