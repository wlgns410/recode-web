export type ProjectType = 'WORK' | 'PERSONAL';

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  startDate: string;
  endDate: string | null;
  techStack?: string[] | null;
  responsibility?: string | null;
}
