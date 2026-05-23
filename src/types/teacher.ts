export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  avatar_url?: string;
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export interface TeacherFilters {
  language: string;
  level: string;
  price: string;
}

export const LANGUAGE_OPTIONS = [
  'French',
  'English',
  'German',
  'Ukrainian',
  'Polish',
  'Spanish',
  'Italian',
  'Korean',
  'Mandarin Chinese',
] as const;

export const LEVEL_OPTIONS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
] as const;

export const PRICE_OPTIONS = ['10', '20', '25', '30', '35', '40'] as const;
