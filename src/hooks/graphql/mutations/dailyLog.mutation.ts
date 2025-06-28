import { gql, useMutation } from '@apollo/client';
import { WorkArea, DailyTag } from '../../../types/enums';

// GraphQL mutation 정의
export const CREATE_DAILY_LOG = gql`
  mutation CreateDailyLog($input: CreateDailyLogInput!) {
    createDailyLog(input: $input) {
      id
      content
      tag
      area
      projectId
      careerId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_DAILY_LOG = gql`
  mutation UpdateDailyLog($input: UpdateDailyLogInput!) {
    updateDailyLog(input: $input) {
      id
      content
      area
      careerId
      projectId
      tag
      createdAt
      updatedAt
      userId
    }
  }
`;

// Input 타입 정의
export interface CreateDailyLogInput {
  content: string;
  tag: DailyTag;
  area: WorkArea;
  projectId?: string;
  careerId?: string;
}

export interface UpdateDailyLogInput {
  id: string;
  content?: string;
  tag?: DailyTag;
  area?: WorkArea;
  projectId?: string;
  careerId?: string;
}

// Response 타입 정의
export interface DailyLogResponse {
  id: string;
  content: string;
  tag: DailyTag;
  area: WorkArea;
  projectId?: string;
  careerId?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Mutation response 타입 정의
export interface CreateDailyLogResponse {
  createDailyLog: DailyLogResponse;
}

export interface UpdateDailyLogResponse {
  updateDailyLog: DailyLogResponse;
}

// Variables 타입 정의
export interface CreateDailyLogVariables {
  input: CreateDailyLogInput;
}

export interface UpdateDailyLogVariables {
  input: UpdateDailyLogInput;
}

// Mutation 훅들
export const useCreateDailyLog = () => {
  return useMutation<CreateDailyLogResponse, CreateDailyLogVariables>(CREATE_DAILY_LOG, {
    // 성공 시 캐시 업데이트 옵션 (필요에 따라 추가)
    onCompleted: (data) => {},
    onError: (error) => {
      console.error('Failed to create daily log:', error);
    },
    // 에러 정책 설정
    errorPolicy: 'all',
  });
};

export const useUpdateDailyLog = () => {
  return useMutation<UpdateDailyLogResponse, UpdateDailyLogVariables>(UPDATE_DAILY_LOG, {
    // 성공 시 캐시 업데이트
    update: (cache, { data }) => {
      if (data?.updateDailyLog) {
        // 캐시에서 해당 DailyLog 업데이트
        cache.modify({
          fields: {
            getMyDailyLogsByMonth: (existingLogs = []) => {
              return existingLogs.map((log: any) => {
                if (log.id === data.updateDailyLog.id) {
                  return { ...log, ...data.updateDailyLog };
                }
                return log;
              });
            },
          },
        });
      }
    },
    onCompleted: (data) => {},
    onError: (error) => {
      console.error('Failed to update daily log:', error);
    },
    errorPolicy: 'all',
  });
};
