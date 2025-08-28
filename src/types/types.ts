export type Category = 'about me' | 'projects' | 'contact' | 'skills';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Card {
  id: string;
  name?: string;
  proficiency?: number;
  yearsOfExperience?: number;
  description?: string;
  status?: 'mastered' | 'proficient' |'learning' | 'exploring';
  icon?: string;
  title?: string;
  content: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}