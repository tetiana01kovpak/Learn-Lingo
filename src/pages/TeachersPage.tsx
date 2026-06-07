import { Filters } from '@/components/Filters/Filters';
import { TeacherList } from '@/components/TeacherList/TeacherList';
import { useTeacherCatalog } from '@/hooks/useTeacherCatalog';
import styles from './TeachersPage.module.css';

export const TeachersPage = () => {
  const {
    status,
    filters,
    availableLanguages,
    filtered,
    visibleCount,
    loadMore,
    handleFiltersChange,
  } = useTeacherCatalog();

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
        />
      )}
    </div>
  );
};
