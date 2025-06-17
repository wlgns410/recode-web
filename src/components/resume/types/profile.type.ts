// types/user-profile.type.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  github?: string;
  blog?: string;
}
