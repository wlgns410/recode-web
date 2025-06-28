import { gql, useQuery } from '@apollo/client';
import type { Career } from '../../types/career.type';

export const GET_MY_CAREERS = gql`
  query GetMyCareers {
    getMyCareers {
      id
      companyName
      position
      industry
      summary
      startDate
      endDate
    }
  }
`;

interface GetMyCareersResponse {
  getMyCareers: Career[];
}

export function useGetCareers() {
  return useQuery<GetMyCareersResponse>(GET_MY_CAREERS);
}
