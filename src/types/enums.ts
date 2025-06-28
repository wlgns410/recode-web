// DailyTag enum - 일일 기록 태그
export enum DailyTag {
  DEBUG = 'DEBUG',
  DEPLOYMENT = 'DEPLOYMENT',
  DEVELOPMENT = 'DEVELOPMENT',
  DOCUMENTATION = 'DOCUMENTATION',
  MEETING = 'MEETING',
  PLANNING = 'PLANNING',
  REFACTORING = 'REFACTORING',
  REVIEW = 'REVIEW',
  STUDY = 'STUDY',
  TESTING = 'TESTING',
}

// WorkArea enum - 작업 영역
export enum WorkArea {
  AI_ML = 'AI_ML',
  BACKEND = 'BACKEND',
  DATA = 'DATA',
  DESIGN = 'DESIGN',
  DEVOPS = 'DEVOPS',
  ETC = 'ETC',
  FRONTEND = 'FRONTEND',
  FULLSTACK = 'FULLSTACK',
  INFRA = 'INFRA',
  MOBILE = 'MOBILE',
  PM = 'PM',
  PO = 'PO',
  QA = 'QA',
  SECURITY = 'SECURITY',
}

// 태그 한국어 매핑 (UI에서 사용)
export const DailyTagLabels: Record<DailyTag, string> = {
  [DailyTag.DEBUG]: '디버깅',
  [DailyTag.DEPLOYMENT]: '배포',
  [DailyTag.DEVELOPMENT]: '개발',
  [DailyTag.DOCUMENTATION]: '문서화',
  [DailyTag.MEETING]: '회의',
  [DailyTag.PLANNING]: '기획',
  [DailyTag.REFACTORING]: '리팩토링',
  [DailyTag.REVIEW]: '리뷰',
  [DailyTag.STUDY]: '학습',
  [DailyTag.TESTING]: '테스팅',
};

// 작업영역 한국어 매핑 (UI에서 사용)
export const WorkAreaLabels: Record<WorkArea, string> = {
  [WorkArea.AI_ML]: 'AI/ML',
  [WorkArea.BACKEND]: '백엔드',
  [WorkArea.DATA]: '데이터',
  [WorkArea.DESIGN]: '디자인',
  [WorkArea.DEVOPS]: 'DevOps',
  [WorkArea.ETC]: '기타',
  [WorkArea.FRONTEND]: '프론트엔드',
  [WorkArea.FULLSTACK]: '풀스택',
  [WorkArea.INFRA]: '인프라',
  [WorkArea.MOBILE]: '모바일',
  [WorkArea.PM]: 'PM',
  [WorkArea.PO]: 'PO',
  [WorkArea.QA]: 'QA',
  [WorkArea.SECURITY]: '보안',
};
