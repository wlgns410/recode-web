import { gql, useQuery } from '@apollo/client';
import type {
  DailyLogsByMonthResponse,
  DailyLogsByMonthVariables,
  DailyLogResponse,
  DailyLogVariables,
} from '../../types/dailyLog.type';

const GET_MY_DAILY_LOGS_BY_MONTH = gql`
  query GetMyDailyLogsByMonth($month: Float!, $year: Float!) {
    getMyDailyLogsByMonth(month: $month, year: $year) {
      id
      content
      area
      careerId
      projectId
      tag
      createdAt
      updatedAt
      userId
      career {
        id
        companyName
        position
        industry
        summary
        startDate
        endDate
      }
      project {
        id
        name
        description
        type
        startDate
        endDate
        techStack
        responsibility
      }
    }
  }
`;

const GET_MY_DAILY_LOG = gql`
  query GetMyDailyLog($id: ID!) {
    getMyDailyLog(id: $id) {
      id
      content
      area
      careerId
      projectId
      tag
      createdAt
      updatedAt
      userId
      career {
        id
        companyName
        position
        industry
        summary
        startDate
        endDate
      }
      project {
        id
        name
        description
        type
        startDate
        endDate
        techStack
        responsibility
      }
    }
  }
`;

export const useGetDailyLogsByMonth = (month: number, year: number) => {
  return useQuery<DailyLogsByMonthResponse, DailyLogsByMonthVariables>(GET_MY_DAILY_LOGS_BY_MONTH, {
    variables: { month, year },
  });
};

export const useGetDailyLog = (id: string) => {
  return useQuery<DailyLogResponse, DailyLogVariables>(GET_MY_DAILY_LOG, {
    variables: { id },
  });
};
