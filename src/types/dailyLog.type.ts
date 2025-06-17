import type { WorkArea, DailyTag } from './enums';
import type { Career } from '../components/resume/types/career.type';
import type { Project } from '../components/resume/types/project.type';

export interface DailyLog {
  id: string;
  content: string;
  area: WorkArea;
  career?: Career;
  careerId?: string;
  project?: Project;
  projectId?: string;
  tag: DailyTag;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// GraphQL 쿼리 응답 타입
export interface DailyLogsByMonthResponse {
  getMyDailyLogsByMonth: DailyLog[];
}

// GraphQL 쿼리 변수 타입
export interface DailyLogsByMonthVariables {
  month: number;
  year: number;
}

// 단일 DailyLog 조회용 타입
export interface DailyLogResponse {
  getMyDailyLog: DailyLog;
}

// 단일 DailyLog 조회용 변수 타입
export interface DailyLogVariables {
  id: string;
}
