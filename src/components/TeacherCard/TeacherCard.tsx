import { useState } from 'react';
import clsx from 'clsx';
import type { Teacher } from '@/types/teacher';
import { useFavorites } from '@/hooks/useFavorites';
import { BookOpenIcon, HeartIcon, StarIcon } from '@/components/ui/icons';
import { BookTrialModal } from '@/components/BookTrialModal/BookTrialModal';
import styles from './TeacherCard.module.css';

interface Props {
  teacher: Teacher;
  highlightedLevel?: string;
  initiallyExpanded?: boolean;
}

const AVATAR_RING_COLORS = ['#fbe9ba', '#cbded3', '#bfd6ea', '#f2c0bd', '#f4c8ba'];

export const TeacherCard = ({ teacher, highlightedLevel, initiallyExpanded = false }: Props) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [bookOpen, setBookOpen] = useState(false);
  const { isFavorite, toggle } = useFavorites();

  const fav = isFavorite(teacher.id);
  const ringIdx =
    Array.from(teacher.id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_RING_COLORS.length;

  const activeLevel = highlightedLevel ?? teacher.levels[0];

  return (
    <article className={styles.card}>
      <div className={styles.avatarWrap} style={{ borderColor: AVATAR_RING_COLORS[ringIdx] }}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.avatar}
          loading="lazy"
        />
        <span className={styles.onlineDot} aria-label="Online" />
      </div>

      <div className={styles.body}>
        <header className={styles.head}>
          <div className={styles.identity}>
            <span className={styles.languagesLabel}>Languages</span>
            <h3 className={styles.name}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <BookOpenIcon className={styles.metaIcon} />
              Lessons online
            </span>
            <span className={styles.metaItem}>Lessons done: {teacher.lessons_done}</span>
            <span className={styles.metaItem}>
              <StarIcon className={clsx(styles.metaIcon, styles.star)} />
              Rating: {teacher.rating.toFixed(1)}
            </span>
            <span className={styles.metaItem}>
              Price / 1 hour: <span className={styles.priceValue}>{teacher.price_per_hour}$</span>
            </span>
            <button
              type="button"
              className={clsx(styles.heartBtn, fav && styles.heartActive)}
              onClick={() => toggle(teacher.id)}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={fav}
            >
              <HeartIcon filled={fav} className={styles.heartIcon} />
            </button>
          </div>
        </header>

        <div className={styles.facts}>
          <p className={styles.fact}>
            <span className={styles.factLabel}>Speaks: </span>
            <span className={styles.factValue}>{teacher.languages.join(', ')}</span>
          </p>
          <p className={styles.fact}>
            <span className={styles.factLabel}>Lesson Info: </span>
            <span className={styles.factText}>{teacher.lesson_info}</span>
          </p>
          <p className={styles.fact}>
            <span className={styles.factLabel}>Conditions: </span>
            <span className={styles.factText}>{teacher.conditions.join(' ')}</span>
          </p>
        </div>

        {!expanded && (
          <button type="button" className={styles.readMore} onClick={() => setExpanded(true)}>
            Read more
          </button>
        )}

        {expanded && (
          <>
            <p className={styles.experience}>{teacher.experience}</p>
            <div className={styles.reviews}>
              {teacher.reviews.map((review, idx) => (
                <div key={`${review.reviewer_name}-${idx}`} className={styles.review}>
                  <div className={styles.reviewHead}>
                    {review.avatar_url ? (
                      <img
                        src={review.avatar_url}
                        alt={review.reviewer_name}
                        className={styles.reviewAvatar}
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className={styles.reviewAvatar}
                        style={{
                          background: 'var(--color-primary-soft)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {review.reviewer_name.charAt(0)}
                      </span>
                    )}
                    <div className={styles.reviewMeta}>
                      <span className={styles.reviewerName}>{review.reviewer_name}</span>
                      <span className={styles.reviewRating}>
                        <StarIcon className={clsx(styles.metaIcon, styles.star)} />
                        {review.reviewer_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <ul className={styles.levels}>
          {teacher.levels.map((level) => (
            <li key={level}>
              <span
                className={clsx(
                  styles.levelChip,
                  level === activeLevel && styles.levelChipActive,
                )}
              >
                #{level}
              </span>
            </li>
          ))}
        </ul>

        {expanded && (
          <button type="button" className={styles.bookBtn} onClick={() => setBookOpen(true)}>
            Book trial lesson
          </button>
        )}
      </div>

      <BookTrialModal open={bookOpen} onClose={() => setBookOpen(false)} teacher={teacher} />
    </article>
  );
};
