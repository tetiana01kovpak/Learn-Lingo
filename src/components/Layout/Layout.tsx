import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Header } from '@/components/Header/Header';
import styles from './Layout.module.css';

export const Layout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={clsx(styles.shell, isHome ? styles.home : styles.default)}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
