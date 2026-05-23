import type { Teacher } from '@/types/teacher';
import { TeacherCard } from '@/components/TeacherCard/TeacherCard';
import styles from './TeacherList.module.css';

interface Props {
  teachers: Teacher[];
  highlightedLevel?: string;
  visibleCount?: number;
  onLoadMore?: () => void;
  emptyMessage?: string;
}

export const TeacherList = ({
  teachers,
  highlightedLevel,
  visibleCount,
  onLoadMore,
  emptyMessage = 'No teachers match the current filters.',
}: Props) => {
  if (teachers.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  const visible = visibleCount ? teachers.slice(0, visibleCount) : teachers;
  const canLoadMore = Boolean(visibleCount && onLoadMore && teachers.length > visible.length);

  return (
    <>
      <ul className={styles.list}>
        {visible.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} highlightedLevel={highlightedLevel} />
          </li>
        ))}
      </ul>
      {canLoadMore && (
        <div className={styles.loadMoreWrap}>
          <button type="button" className={styles.loadMore} onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};
