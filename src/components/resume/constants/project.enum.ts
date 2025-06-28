// 프로젝트 타입
export const PROJECT_TYPES = ['WORK', 'PERSONAL'] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]; // 'WORK' | 'PERSONAL'

export const PROJECT_LABELS: Record<ProjectType, string> = {
  WORK: '회사 프로젝트',
  PERSONAL: '개인 프로젝트',
};
