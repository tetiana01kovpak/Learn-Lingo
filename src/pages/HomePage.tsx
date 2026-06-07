import { Link } from 'react-router-dom';
import heroImg from '@/assets/hero.png';
import styles from './HomePage.module.css';

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

export const HomePage = () => (
  <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>
          Unlock your potential with the best{' '}
          <span className={styles.titleHighlight}>language</span> tutors
        </h1>
        <p className={styles.subtitle}>
          Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language
          proficiency to new heights by connecting with highly qualified and experienced tutors.
        </p>
        <Link to="/teachers" className={styles.cta}>
          Get started
        </Link>
      </div>
      <div className={styles.heroRight}>
        <img src={heroImg} alt="Memoji with a laptop" className={styles.heroImage} />
      </div>
    </section>

    <ul className={styles.stats}>
      {stats.map(({ value, label }) => (
        <li key={value} className={styles.stat}>
          <span className={styles.statValue}>{value}</span>
          <span className={styles.statLabel}>{label}</span>
        </li>
      ))}
    </ul>
  </div>
);
