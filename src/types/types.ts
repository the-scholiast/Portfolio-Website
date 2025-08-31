export type Category = 'about me' | 'projects' | 'skills';

export interface Card {
  id: string;
  name?: string;
  type?: string;
  proficiency?: number;
  yearsOfExperience?: string;
  employer?: string;
  field?: string;
  hobbies?: string[];
  description?: string;
  status?: 'mastered' | 'advanced' | 'proficient' | 'improving' | 'basic' | 'learning';
  icon?: string;
  title: string;
  content?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface PersonalInfo {
  header: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  profilePicture: string;
  description: string;
  pokerChip: string;
}

export interface DetailedCardProps {
  card: Card | null;
  currentCategory: Category | null;
  index: number;
}