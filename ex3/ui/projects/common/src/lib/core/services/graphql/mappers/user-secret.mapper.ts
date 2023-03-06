import { Injectable } from '@angular/core';

import { UserSecret } from '../../../models/graphql/user-secret';
import { AuthenticateDto } from '../dtos/user-secret';
import { IMapper } from '../../mappers/mappers';

/** User secret mapper. */
@Injectable({
  providedIn: 'root',
})
export class UserSecretMapper
implements IMapper<AuthenticateDto, UserSecret> {
  /** @inheritdoc */
  public toDto(data: UserSecret): AuthenticateDto {
    return {
      authenticate: {
        jwtToken: data.token,
      },
    };
  }

  /** @inheritdoc */
  public fromDto(dto: AuthenticateDto): UserSecret {
    return {
      token: dto.authenticate.jwtToken,
    };
  }
}
