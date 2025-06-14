// types/resume.ts
export interface ResumeInfo {
  name: string;
  email: string;
  phone?: string;
  summary?: string;
  // 필요시 더 추가
}
// types/resume.ts
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  blog: string;
}

export interface Education {
  id: number;
  school: string;
  major: string;
  period: string;
  gpa: string;
}

export interface Career {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  tech: string;
}

export interface Award {
  id: number;
  title: string;
  date: string;
  organization: string;
}

export interface Certification {
  id: number;
  title: string;
  date: string;
  organization: string;
}
