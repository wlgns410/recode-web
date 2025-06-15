import { gql } from '@apollo/client';

export const REQUEST_EMAIL_VERIFICATION = gql`
  mutation RequestEmailVerification($email: String!) {
    requestEmailVerification(email: $email)
  }
`;
