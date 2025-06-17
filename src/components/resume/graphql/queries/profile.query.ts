import { gql, useQuery } from '@apollo/client';
import type { UserProfile } from '../../types/profile.type';

export const GET_MY_USER_PROFILE = gql`
  query GetMyUserProfile {
    getMyUserProfile {
      id
      name
      email
      phone
      blog
      github
    }
  }
`;

interface GetMyUserProfileResponse {
  getMyUserProfile: UserProfile;
}

export const useGetUserProfile = () => useQuery<GetMyUserProfileResponse>(GET_MY_USER_PROFILE);
