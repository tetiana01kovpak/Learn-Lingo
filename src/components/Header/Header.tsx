import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logoutUser } from '@/store/authSlice';
import { LoginModal } from '@/components/LoginModal/LoginModal';
import { RegistrationModal } from '@/components/RegistrationModal/RegistrationModal';
import { FlagIcon, LogInIcon, LogOutIcon } from '@/components/ui/icons';
import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={clsx('container', styles.inner)}>
        <NavLink to="/" className={styles.logo} aria-label="LearnLingo home">
          <FlagIcon className={styles.logoFlag} />
          <span>LearnLingo</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              clsx(styles.navLink, isActive && styles.navLinkActive)
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              clsx(styles.navLink, isActive && styles.navLinkActive)
            }
          >
            Teachers
          </NavLink>
          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                clsx(styles.navLink, isActive && styles.navLinkActive)
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.userName}>
                <span className={styles.userAvatar} aria-hidden="true">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </span>
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={() => void dispatch(logoutUser())}
              >
                <LogOutIcon style={{ color: 'var(--color-primary)' }} />
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.loginBtn}
                onClick={() => setLoginOpen(true)}
              >
                <LogInIcon className={styles.loginIcon} />
                Log in
              </button>
              <button
                type="button"
                className={styles.registerBtn}
                onClick={() => setRegisterOpen(true)}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegistrationModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </header>
  );
};
