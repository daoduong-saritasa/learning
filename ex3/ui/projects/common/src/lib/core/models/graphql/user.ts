/**
 * Basic representation of a user.
 */
export interface User {

  /**
   * ID.
   */
  readonly id: number;

  /**
   * First name.
   */
  readonly firstName: string;

  /**
   * Last name.
   */
  readonly lastName: string;

  /**
   * Email.
   */
  readonly email: string;

  /**
   * Is admin.
   */
  readonly isAdmin: boolean;
}
