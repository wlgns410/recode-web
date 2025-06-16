import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInputType!) {
    signUp(input: $input) {
      jwt
      user {
        id
        email
        username
      }
    }
  }
`;
