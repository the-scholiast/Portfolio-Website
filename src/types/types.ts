export type Category = 'about me' | 'projects' | 'contact' | 'skills';

export interface Card {
  id: string;
  name?: string;
  type?: string;
  proficiency?: number;
  yearsOfExperience?: number;
  description?: string;
  status?: 'mastered' | 'proficient' | 'learning' | 'exploring';
  icon?: string;
  title: string;
  content: string;
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