import { gql, useMutation } from '@apollo/client';

export const CREATE_USER_PROFILE = gql`
  mutation CreateUserProfile($input: CreateUserProfileInput!) {
    createUserProfile(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      id
    }
  }
`;

export function useCreateUserProfile() {
  return useMutation(CREATE_USER_PROFILE);
}

export function useUpdateUserProfile() {
  return useMutation(UPDATE_USER_PROFILE);
}
