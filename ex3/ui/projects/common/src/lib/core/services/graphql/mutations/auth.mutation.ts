import { gql } from 'apollo-angular';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  authenticate(input: {email: $email, password: $password}) {
    jwtToken
  }
}
`;
