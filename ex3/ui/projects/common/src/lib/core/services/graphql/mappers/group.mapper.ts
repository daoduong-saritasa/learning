import { Injectable } from '@angular/core';

import { Group } from '@saanbo/common/core/models/graphql/group';

import { IMapperFromDto } from '../../mappers/mappers';
import { GroupDto } from '../dtos/group';

/** Group mapper. */
@Injectable({
  providedIn: 'root',
})
export class GroupMapper implements IMapperFromDto<GroupDto, Group> {
  /** @inheritdoc */
  public fromDto(data: GroupDto): Group {
    return {
      id: data.id,
      name: data.name,
    };
  }
}
