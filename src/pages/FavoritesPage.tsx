import { useCallback } from 'react';
import { Filters } from '@/components/Filters/Filters';
import { TeacherList } from '@/components/TeacherList/TeacherList';
import { useTeacherCatalog } from '@/hooks/useTeacherCatalog';
import { useAppSelector } from '@/store/store';
import type { Teacher } from '@/types/teacher';
import styles from './TeachersPage.module.css';

export const FavoritesPage = () => {
  const favoriteIds = useAppSelector((s) => s.favorites.ids);

  const selectFavorites = useCallback(
    (teachers: Teacher[]) => teachers.filter((t) => favoriteIds.includes(t.id)),
    [favoriteIds],
  );

  const {
    status,
    base,
    filters,
    availableLanguages,
    filtered,
    visibleCount,
    loadMore,
    handleFiltersChange,
  } = useTeacherCatalog(selectFavorites);

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
          onLoadMore={loadMore}
          emptyMessage={
            base.length === 0
              ? "You haven't added any teachers to your favorites yet."
              : 'No favorite teachers match the current filters.'
          }
        />
      )}
    </div>
  );
};
