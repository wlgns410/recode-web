export interface Education {
  id: string;
  schoolName: string;
  major: string;
  degree: string;
  startDate: string; // ISO Date string (e.g., "2022-03-01")
  endDate?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
