/** User profile response. */
export interface UserProfileDto {

  /** User by id response. */
  readonly userProfile: UserDto;
}

/** Basic representation of a user. */
export interface UserDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly firstname: string;

  /** Id. */
  readonly id: number;

  /** Is admin. */
  readonly isAdmin: boolean;

  /** Last name. */
  readonly lastname: string;
}
