import { Nodes } from './nodes';

/** Groups response. */
export interface GroupsDto {

  /** All groups. */
  allGroups: Nodes<GroupDto>;
}

/** Group response. */
export interface GroupDto {

  /** Id. */
  id: number;

  /** Name. */
  name: string;
}

/** Group detail by id. */
export interface GroupByIdDto {

  /** Group by id. */
  groupById: GroupDto;
}
