import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInputType!) {
    signIn(input: $input) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;
