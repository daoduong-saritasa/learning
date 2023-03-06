import { gql } from 'apollo-angular';

export const USER_PROFILE = gql`
  query UserProfile {
    userProfile {
      email
      firstname
      id
      isAdmin
      lastname
    }
  }
`;
