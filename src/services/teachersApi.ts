import { get, ref } from 'firebase/database';
import { db } from '@/firebase/config';
import type { Teacher } from '@/types/teacher';
import fallbackTeachers from '../../public/teachers.json';

const cleanupTeacher = (id: string, raw: Record<string, unknown>): Teacher => ({
  id,
  name: String(raw.name ?? ''),
  surname: String(raw.surname ?? ''),
  languages: Array.isArray(raw.languages) ? (raw.languages as string[]) : [],
  levels: Array.isArray(raw.levels) ? (raw.levels as string[]) : [],
  rating: Number(raw.rating ?? 0),
  reviews: Array.isArray(raw.reviews) ? (raw.reviews as Teacher['reviews']) : [],
  price_per_hour: Number(raw.price_per_hour ?? 0),
  lessons_done: Number(raw.lessons_done ?? 0),
  avatar_url: String(raw.avatar_url ?? ''),
  lesson_info: String(raw.lesson_info ?? ''),
  conditions: Array.isArray(raw.conditions) ? (raw.conditions as string[]) : [],
  experience: String(raw.experience ?? ''),
});

export const fetchTeachers = async (): Promise<Teacher[]> => {
  try {
    const snapshot = await get(ref(db, 'teachers'));
    if (snapshot.exists()) {
      const value = snapshot.val();
      if (Array.isArray(value)) {
        return value
          .map((raw, i) =>
            raw ? cleanupTeacher(String(i), raw as Record<string, unknown>) : null,
          )
          .filter((t): t is Teacher => t !== null);
      }
      if (value && typeof value === 'object') {
        return Object.entries(value as Record<string, Record<string, unknown>>).map(
          ([id, raw]) => cleanupTeacher(id, raw),
        );
      }
    }
  } catch (err) {
    console.warn('[LearnLingo] Failed to fetch teachers from Firebase, using local fallback.', err);
  }

  return (fallbackTeachers as Array<Record<string, unknown>>).map((raw, i) =>
    cleanupTeacher(`local_${i}`, raw),
  );
};
