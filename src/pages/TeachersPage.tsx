import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '@/components/Filters/Filters';
import { TeacherList } from '@/components/TeacherList/TeacherList';
import { fetchTeachers } from '@/services/teachersApi';
import type { Teacher, TeacherFilters } from '@/types/teacher';
import styles from './TeachersPage.module.css';

const PAGE_SIZE = 4;

const matches = (teacher: Teacher, filters: TeacherFilters) => {
  if (filters.language && !teacher.languages.includes(filters.language)) return false;
  if (filters.level && !teacher.levels.includes(filters.level)) return false;
  if (filters.price && teacher.price_per_hour !== Number(filters.price)) return false;
  return true;
};

export const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: TeacherFilters = {
    language: searchParams.get('language') ?? '',
    level: searchParams.get('level') ?? '',
    price: searchParams.get('price') ?? '',
  };

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchTeachers()
      .then((data) => {
        if (cancelled) return;
        setTeachers(data);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    teachers.forEach((t) => t.languages.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [teachers]);

  const filtered = useMemo(
    () => teachers.filter((t) => matches(t, filters)),
    [teachers, filters],
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters.language, filters.level, filters.price]);

  const handleFiltersChange = (next: TeacherFilters) => {
    const params: Record<string, string> = {};
    if (next.language) params.language = next.language;
    if (next.level) params.level = next.level;
    if (next.price) params.price = next.price;
    setSearchParams(params, { replace: true });
  };

  return (
    <div className={`container ${styles.page}`}>
      <Filters
        value={filters}
        onChange={handleFiltersChange}
        availableLanguages={availableLanguages}
      />

      {status === 'loading' && <p className={styles.status}>Loading teachers…</p>}
      {status === 'error' && (
        <p className={styles.status}>
          Could not load teachers. Make sure your Firebase config is set up.
        </p>
      )}

      {status === 'ready' && (
        <TeacherList
          teachers={filtered}
          highlightedLevel={filters.level || undefined}
          visibleCount={visibleCount}
          onLoadMore={() => setVisibleCount((v) => v + PAGE_SIZE)}
        />
      )}
    </div>
  );
};
