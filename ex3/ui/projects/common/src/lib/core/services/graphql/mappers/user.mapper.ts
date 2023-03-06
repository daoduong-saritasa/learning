import { Injectable } from '@angular/core';

import { User } from '../../../models/graphql/user';

import { UserDto } from '../dtos/user.dto';

import { IMapperFromDto } from '../../mappers/mappers';

/** User mapper. */
@Injectable({
  providedIn: 'root',
})
export class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(data: UserDto): User {
    return {
      firstName: data.firstname,
      lastName: data.lastname,
      id: data.id,
      email: '',
      isAdmin: false,
    };
  }
}
