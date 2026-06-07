import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchTeachers } from '@/services/teachersApi';
import type { Teacher, TeacherFilters } from '@/types/teacher';

export const PAGE_SIZE = 4;

type Status = 'idle' | 'loading' | 'ready' | 'error';

const matches = (teacher: Teacher, filters: TeacherFilters) => {
  if (filters.language && !teacher.languages.includes(filters.language)) return false;
  if (filters.level && !teacher.levels.includes(filters.level)) return false;
  if (filters.price && teacher.price_per_hour !== Number(filters.price)) return false;
  return true;
};

export const useTeacherCatalog = (getBase?: (teachers: Teacher[]) => Teacher[]) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const language = searchParams.get('language') ?? '';
  const level = searchParams.get('level') ?? '';
  const price = searchParams.get('price') ?? '';

  const filters = useMemo<TeacherFilters>(
    () => ({ language, level, price }),
    [language, level, price],
  );

  const base = useMemo(() => (getBase ? getBase(teachers) : teachers), [teachers, getBase]);

  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    base.forEach((t) => t.languages.forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [base]);

  const filtered = useMemo(() => base.filter((t) => matches(t, filters)), [base, filters]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [language, level, price]);

  const handleFiltersChange = useCallback(
    (next: TeacherFilters) => {
      const params: Record<string, string> = {};
      if (next.language) params.language = next.language;
      if (next.level) params.level = next.level;
      if (next.price) params.price = next.price;
      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  const loadMore = useCallback(() => setVisibleCount((v) => v + PAGE_SIZE), []);

  return {
    status,
    base,
    filters,
    availableLanguages,
    filtered,
    visibleCount,
    loadMore,
    handleFiltersChange,
  };
};
