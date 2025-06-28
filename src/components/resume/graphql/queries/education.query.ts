import { gql, useQuery } from '@apollo/client';
import type { Education } from '../../types/education.type';

export const GET_EDUCATIONS = gql`
  query GetEducations {
    getEducations {
      id
      schoolName
      major
      degree
      startDate
      endDate
      userId
      createdAt
      updatedAt
    }
  }
`;

export const useGetEducations = () => {
  return useQuery<{ getEducations: Education[] }>(GET_EDUCATIONS);
};
