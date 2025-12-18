export interface Project {
  id: string;
  title: string;
  category: 'Web Dev' | 'Mobile' | 'Full Stack' | 'Academic';
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  skills: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export interface DemoVideo {
  id: string;
  title: string;
  category: string;
  videoUrl: string; // mp4 url
  posterUrl: string;
  stats: {
    views: string;
    likes: string;
  };
}

export enum SectionId {
  HERO = 'hero',
  WORK = 'work',
  EXPERIENCE = 'experience',
  CERTIFICATES = 'certificates',
  ABOUT = 'about',
  CONTACT = 'contact',
  DEMOS = 'demos',
}