import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

import { User } from '../models/graphql/user';

import { AppUrlsConfig } from './app-urls.config';

import { USER_PROFILE } from './graphql/queries/user.query';
import { UserProfileDto } from './graphql/dtos/user.dto';
import { UserMapper } from './graphql/mappers/user.mapper';

/** Performs CRUD operations for users. */
@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  public constructor(
    private readonly apiUrls: AppUrlsConfig,
    private readonly httpClient: HttpClient,
    private readonly userMapper: UserMapper,
    private apollo: Apollo,
  ) {}

  /** Returns current user info.*/
  public getCurrentUser(): Observable<User> {
    return this.apollo.watchQuery<UserProfileDto>({
      query: USER_PROFILE,
    }).valueChanges.pipe(
      map(result => {
        const user = this.userMapper.fromDto(result.data.userProfile);
        return user;
      }),
    );
  }
}
