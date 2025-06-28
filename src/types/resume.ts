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
  id: string;
  school: string;
  major: string;
  period: string;
  gpa: string;
}

export interface Career {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  tech: string;
}

export interface Award {
  id: string;
  title: string;
  date: string;
  organization: string;
}

export interface Certification {
  id: string;
  title: string;
  date: string;
  organization: string;
  // type:
}
