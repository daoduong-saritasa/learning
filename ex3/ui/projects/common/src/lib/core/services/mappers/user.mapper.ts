import { Injectable } from '@angular/core';

import { User } from '../../models/user';

import { UserDto } from './dto/user.dto';
import { IMapperFromDto } from './mappers';

/** User mapper. */
@Injectable({
  providedIn: 'root',
})
export class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(data: UserDto): User {
    return {
      firstname: data.first_name,
      lastname: data.last_name,
      id: data.id,
      email: '',
      isAdmin: false,
    };
  }
}
